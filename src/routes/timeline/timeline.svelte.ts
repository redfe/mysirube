import type { Data } from '$lib/repository';
import { linear } from 'svelte/easing';
import type { FadeParams } from 'svelte/transition';

export type Item = Data & {
	end: number;
};

/**
 * 枠単位の開始・終了取得
 * 枠内に入るのは unitStart <= year < unitEnd
 *
 * @param start
 * @param end
 * @param unit
 * @returns
 */
export function getUnitPeriod(start: number, end: number, unit: number) {
	const unitStart = Math.floor(start / unit) * unit;
	const unitEnd = Math.floor(end / unit) * unit;
	return {
		start: unitStart,
		end: unitEnd
	};
}

// 表示枠作成
export function generatePeriods(unit: number, items: Item[]): number[] {
	if (items.length === 0) return [];
	const min = items[0].start;
	const max = [...items].sort((a, b) => b.end - a.end)[0].end;
	const displayPeriod = getUnitPeriod(min, max, unit);
	const periods = new Array(Math.abs(displayPeriod.end - displayPeriod.start) / unit + 1);
	for (let i = 0; i < periods.length; i++) {
		periods[i] = displayPeriod.start + i * unit;
	}
	return periods;
}

export function formatYear(y: number) {
	return `${new Intl.NumberFormat().format(y)}年`;
}

export function createLanes(unit: number, items: Item[]) {
	const lanes: Item[][] = [];

	items.forEach((item) => {
		if (lanes.length === 0) {
			lanes.push([]);
		}
		for (const lane of lanes) {
			const last = lane[lane.length - 1];
			if (!last) {
				lane.push(item);
				return;
			} else {
				const laneEndYear = getUnitPeriod(last.start, last.end, unit).end + (unit - 1);
				const unitPeriod = getUnitPeriod(item.start, item.end, unit);
				const itemStart = unitPeriod.start;
				if (laneEndYear < itemStart) {
					lane.push(item);
					return;
				}
			}
		}
		lanes.push([item]);
	});

	return lanes;
}

// ツールチップ表示アクション
// 参考：https://svelte.dev/tutorial/svelte/adding-parameters-to-actions
export function tooltip(node: HTMLElement) {
	const positionRatio = { x: 0, y: 0 };

	$effect(() => {
		const originalZIndex = node.style.zIndex;
		const offset = { y: 0, x: 0 };

		let tooltip: HTMLElement | undefined;
		let pinned = false;

		const toPinned = () => {
			const t = createTooltipElm();
			pinned = true;
			t.style.boxShadow = 'none';
			t.style.translate = '0 0.1rem';
			t.classList.add('pinned');
		};

		const toUnPinned = () => {
			pinned = false;
			if (tooltip) {
				tooltip.style.boxShadow = '0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.75)';
				tooltip.style.translate = '0 0';
				tooltip.style.opacity = '0.8';
				tooltip.classList.remove('pinned');
			}
		};

		const toFront = () => {
			const nodes: HTMLElement[] = Array.from(node.parentElement?.querySelectorAll('.bar') ?? []);
			const max = nodes.reduce((acc, cur) => Math.max(acc, parseInt(cur.style.zIndex || '0')), 0);
			node.style.zIndex = `${max + 1}`;
			if (tooltip) tooltip.style.zIndex = `${max + 1}`;
		};

		const createTooltipElm = (): HTMLElement => {
			if (tooltip) return tooltip;
			tooltip = document.createElement('div');
			tooltip.id = 'tooltip-' + node.id;
			tooltip.classList.add('tooltip');
			tooltip.style.position = 'absolute';
			tooltip.style.whiteSpace = 'nowrap';
			tooltip.style.transition = 'translate 0.25s, box-shadow 0.25s, opacity 0.25s';
			toUnPinned();
			const desc = document.createElement('span');
			desc.textContent = `${formatYear(parseInt(node.dataset.start!))}${node.dataset.start === node.dataset.end ? '' : '〜' + formatYear(parseInt(node.dataset.end!))} ${node.dataset.title}`;
			tooltip.append(desc);
			node.parentElement!.append(tooltip);
			offset.y = node.parentElement?.offsetTop ?? 0;
			offset.x = node.parentElement?.offsetLeft ?? 0;

			// 最前面に表示されるようにする
			toFront();

			tooltip.addEventListener('click', () => {
				toFront();
			});

			return tooltip;
		};

		const removeTooltipElm = () => {
			toUnPinned();
			if (tooltip) tooltip.remove();
			tooltip = undefined;

			// 最前面表示を解除
			node.style.zIndex = originalZIndex;
		};

		const movePosition = (e: MouseEvent) => {
			const t = createTooltipElm();
			const { clientX, clientY } = e;

			t.style.top = `${clientY - offset.y + (node.parentElement?.scrollTop ?? 0) - 10}px`;
			t.style.left = `${10 + (clientX - offset.x + (node.parentElement?.scrollLeft ?? 0))}px`;

			positionRatio.y = (parseInt(t.style.top) - node.offsetTop) / node.offsetHeight;
			positionRatio.x = (parseInt(t.style.left) - node.offsetLeft) / node.offsetWidth;
		};

		const mouseover = (e: MouseEvent) => {
			if (tooltip && pinned) {
				return;
			}
			movePosition(e);
		};

		const mousemove = (e: MouseEvent) => {
			if (tooltip && pinned) {
				return;
			}
			movePosition(e);
		};

		const mouseleave = () => {
			if (tooltip && pinned) {
				return;
			}
			removeTooltipElm();
		};

		const click = (e: Event) => {
			toFront();
			// ツールチップクリックで true になってしまうのを防ぐ
			if (e.target != node) {
				return;
			}
			movePosition(e as MouseEvent);
			if (pinned) {
				removeTooltipElm();
				return;
			}
			toPinned();
		};

		const timelineLayoutUpdate = (e: CustomEvent<TimelineLayoutUpdateEventDetail>) => {
			// ツールチップが表示されている場合は再配置する
			if (tooltip) {
				const originalTransition = tooltip.style.transition;

				// スムーズに移動させるために transition を一時的に変更する
				tooltip.style.transition = 'top 0.5s, left 0.5s';

				let top = e.detail.top + positionRatio.y * e.detail.height;
				const left = e.detail.left + positionRatio.x * e.detail.width;
				if (top + tooltip.offsetHeight > e.detail.top + e.detail.height) {
					top = top - tooltip.offsetHeight;
				}
				if (top < e.detail.top) {
					top = e.detail.top;
				}
				tooltip.style.top = `${top}px`;
				tooltip.style.left = `${left}px`;

				// 0.5s 後に transition を元に戻す
				setTimeout(() => {
					tooltip!.style.transition = originalTransition;
				}, 500);
			}
		};

		node.addEventListener('mouseover', mouseover);
		node.addEventListener('mousemove', mousemove);
		node.addEventListener('mouseleave', mouseleave);
		node.addEventListener('click', click);
		node.addEventListener('timelineLayoutUpdate', timelineLayoutUpdate);

		return () => {
			removeTooltipElm();
			node.removeEventListener('mouseover', mouseover);
			node.removeEventListener('mousemove', mousemove);
			node.removeEventListener('mouseleave', mouseleave);
			node.removeEventListener('click', click);
		};
	});
}

export interface TimelineLayoutUpdateEventDetail {
	top: number;
	left: number;
	height: number;
	width: number;
}

declare global {
	interface HTMLElementEventMap {
		timelineLayoutUpdate: CustomEvent<TimelineLayoutUpdateEventDetail>;
	}
}

/**
 * ツールチップも一緒にフェードアウトするためのトランジション
 *
 * @param node
 * @param param1
 * @returns
 */
export function fadeWithTooltip(
	node: Element,
	{ delay = 0, duration = 400, easing = linear }: FadeParams = {}
) {
	const o = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			const opacity = t * o;
			const tooltip: HTMLElement | null = document.querySelector('#tooltip-' + node.id);
			if (tooltip) {
				tooltip.style.opacity = `${opacity}`;
			}
			return `opacity: ${opacity}`;
		}
	};
}
