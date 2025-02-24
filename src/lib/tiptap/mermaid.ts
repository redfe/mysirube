import ImageResize from 'tiptap-extension-resize-image';

type SetMermaidOptions = {
	code: string;
	src: string;
	style?: string;
};

// editor.commands.setMermaid で呼び出せるようにする
declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		mermaid: {
			setMermaid: (options: SetMermaidOptions) => ReturnType;
		};
	}
}

const Mermaid = ImageResize.extend({
	name: 'mermaid',
	addCommands() {
		return {
			setMermaid:
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
			src: {
				default: null
			},
			code: {
				default: null
			},
			style: {
				default: 'width: 100%; height: auto; cursor: pointer;',
				parseHTML: (element) => {
					const width = element.getAttribute('width');
					return width
						? `width: ${width}px; height: auto; cursor: pointer;`
						: `${element.style.cssText}`;
				}
			}
		};
	}
});

export default Mermaid;
