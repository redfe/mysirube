import { mergeAttributes, Node } from '@tiptap/core';
import mermaid from 'mermaid';

type SetMermaidOptions = { text: string };

// editor.commands.xxx で呼び出せるようにする
declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		mermaid: {
			/**
			 * Insert a Mermaid
			 */
			addMermaid: (options: SetMermaidOptions) => ReturnType;
		};
	}
}

const Mermaid = Node.create({
	name: 'mermaid',
	group: 'block',
	addCommands() {
		return {
			addMermaid:
				(options: SetMermaidOptions) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options
					});
				}
		};
	},
	addAttributes() {
		return {
			text: {
				default: 'flowchart\n a --> b'
			}
		};
	},
	parseHTML() {
		return [{ tag: 'div[data-mermaid-digaram]' }];
	},
	renderHTML({ HTMLAttributes }) {
		const element = document.createElement('div');
		const drawDiagram = async function (text: string) {
			// テキストを見せないようにするために透明にする
			element.style.opacity = '0';
			const graphDefinition = text;
			if (await mermaid.parse(graphDefinition, { suppressErrors: true })) {
				element.textContent = text;
				await mermaid.run({ nodes: [element] });
			} else {
				element.textContent = 'Error';
			}
			element.style.border = '1px solid rgba(0, 0, 0, 0.1)';
			element.style.margin = '0.5rem 0';
			element.style.opacity = '1';

			return element;
		};

		drawDiagram(HTMLAttributes.text);

		const attrs = mergeAttributes({ 'data-mermaid-digaram': '' });
		for (const [key, value] of Object.entries(attrs)) {
			element.setAttribute(key, value);
		}

		return element;
	}
});

export default Mermaid;
