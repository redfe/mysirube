type OnchangeHandler<T> = (
	editTarget: T,
	options?: { name: keyof T; before?: unknown; after?: unknown }
) => void;

export class EditData {
	#id: string;
	#start?: string = $state();
	#end?: string = $state();
	#title?: string = $state();
	#color?: string = $state();
	#subColor?: string = $state();
	#createdAt?: Date = $state();
	#updatedAt?: Date = $state();
	#errors: { start?: string; end?: string; title?: string; color?: string; subColor?: string } =
		$state({});
	#onchangeHandler?: OnchangeHandler<EditData>;

	constructor(args?: {
		id?: string;
		start?: string;
		end?: string;
		title?: string;
		color?: string;
		subColor?: string;
		createdAt?: Date;
		updatedAt?: Date;
		onchangeHandler?: OnchangeHandler<EditData>;
	}) {
		this.#id = args?.id ?? crypto.randomUUID();
		this.#start = args?.start;
		this.#end = args?.end;
		this.#title = args?.title;
		this.#color = args?.color;
		this.#subColor = args?.subColor;
		this.#createdAt = args?.createdAt;
		this.#updatedAt = args?.updatedAt;
		this.#onchangeHandler = args?.onchangeHandler;
		this.validate();
	}

	get id() {
		return this.#id;
	}

	set start(start: string | undefined) {
		const before = this.#start;
		this.#start = start;
		this.validate('start');
		this.handleOnChange({ name: 'start', before, after: this.#start });
	}

	get start() {
		return this.#start;
	}

	set end(end: string | undefined) {
		const before = this.#end;
		this.#end = end;
		this.validate('end');
		this.handleOnChange({ name: 'end', before, after: this.#end });
	}

	get end() {
		return this.#end;
	}

	set title(title: string | undefined) {
		const before = this.#title;
		this.#title = title;
		this.validate('title');
		this.handleOnChange({ name: 'title', before, after: this.#title });
	}

	get title() {
		return this.#title;
	}

	set color(color: string | undefined) {
		const before = this.#color;
		this.#color = color;
		this.handleOnChange({ name: 'color', before, after: this.#color });
	}

	get color() {
		return this.#color;
	}

	set subColor(subColor: string | undefined) {
		const before = this.#subColor;
		this.#subColor = subColor;
		this.handleOnChange({ name: 'subColor', before, after: this.#subColor });
	}

	get subColor() {
		return this.#subColor;
	}

	set onchangeHandler(onchangeHandler: OnchangeHandler<EditData> | undefined) {
		this.#onchangeHandler = onchangeHandler;
	}

	get onchangeHandler() {
		return this.#onchangeHandler;
	}

	get errors() {
		return this.#errors;
	}

	get createdAt() {
		return this.#createdAt;
	}

	set createdAt(createdAt: Date | undefined) {
		this.#createdAt = createdAt;
	}

	get updatedAt() {
		return this.#updatedAt;
	}

	set updatedAt(updatedAt: Date | undefined) {
		this.#updatedAt = updatedAt;
	}

	private validate(name?: keyof EditData) {
		if (name === 'start' || !name) {
			if (!validateRequired(this.#start)) {
				this.#errors.start = '開始年を入力して下さい。';
			} else if (!validateNumber(this.#start)) {
				this.#errors.start = '開始年は数値を入力して下さい。';
			} else {
				delete this.#errors.start;
			}
			this.validate('end');
		}
		if (name === 'end' || !name) {
			if (!validateNumber(this.#end)) {
				this.#errors.end = '終了年は数値を入力して下さい。';
			} else if (!validateStartAndEndDate(this.#start, this.#end)) {
				this.#errors.end = '終了年は開始年以上の値を入力して下さい。';
				delete this.#errors.start;
			} else {
				delete this.#errors.end;
			}
		}
		if (name === 'title' || !name) {
			if (!validateRequired(this.#title)) {
				this.#errors.title = 'タイトルを入力して下さい。';
			} else {
				delete this.#errors.title;
			}
		}
	}

	isValid(): boolean {
		return Object.keys(this.#errors).length === 0;
	}

	private handleOnChange(options?: { name: keyof EditData; before?: unknown; after: unknown }) {
		if (this.#onchangeHandler && this.isValid()) {
			this.#onchangeHandler(this, options);
		}
	}
}

export class EditTheme {
	#id: string;
	#title?: string = $state();
	#memo?: string = $state();
	#dataIds?: string[] = $state([]);
	#createdAt?: Date = $state();
	#updatedAt?: Date = $state();
	#errors: { title?: string; memo?: string } = $state({});
	#onchangeHandler?: OnchangeHandler<EditTheme>;

	constructor(args?: {
		id?: string;
		title?: string;
		memo?: string;
		dataIds?: string[];
		createdAt?: Date;
		updatedAt?: Date;
		onchangeHandler?: OnchangeHandler<EditTheme>;
	}) {
		this.#id = args?.id ?? crypto.randomUUID();
		this.#title = args?.title;
		this.#memo = args?.memo;
		this.#dataIds = args?.dataIds;
		this.#createdAt = args?.createdAt;
		this.#updatedAt = args?.updatedAt;
		this.#onchangeHandler = args?.onchangeHandler;
		this.validate();
	}

	get id() {
		return this.#id;
	}

	set title(title: string | undefined) {
		const before = this.#title;
		this.#title = title;
		this.validate('title');
		this.handleOnChange({ name: 'title', before, after: this.#title });
	}

	get title() {
		return this.#title;
	}

	set dataIds(dataIds: string[] | undefined) {
		const before = this.#dataIds;
		this.#dataIds = dataIds;
		this.validate('dataIds');
		this.handleOnChange({ name: 'dataIds', before, after: this.#dataIds });
	}

	get dataIds() {
		return this.#dataIds;
	}

	set memo(memo: string | undefined) {
		const before = this.#memo;
		this.#memo = memo;
		this.validate('memo');
		this.handleOnChange({ name: 'memo', before, after: this.#memo });
	}

	get memo() {
		return this.#memo;
	}

	set onchangeHandler(onchangeHandler: OnchangeHandler<EditTheme> | undefined) {
		this.#onchangeHandler = onchangeHandler;
	}

	get onchangeHandler() {
		return this.#onchangeHandler;
	}

	get errors() {
		return this.#errors;
	}

	get createdAt() {
		return this.#createdAt;
	}

	set createdAt(createdAt: Date | undefined) {
		this.#createdAt = createdAt;
	}

	get updatedAt() {
		return this.#updatedAt;
	}

	set updatedAt(updatedAt: Date | undefined) {
		this.#updatedAt = updatedAt;
	}

	private validate(name?: keyof EditTheme) {
		if (name === 'title' || !name) {
			if (!validateRequired(this.#title)) {
				this.#errors.title = 'テーマ名を入力して下さい。';
			} else {
				delete this.#errors.title;
			}
		}
		if (name === 'memo' || !name) {
			if (!validateMaxLength(this.#memo, 2000)) {
				this.#errors.memo = 'メモは2000文字以内で入力して下さい。';
			} else {
				delete this.#errors.memo;
			}
		}
	}

	isValid(): boolean {
		return Object.keys(this.#errors).length === 0;
	}

	private handleOnChange(options?: { name: keyof EditTheme; before?: unknown; after: unknown }) {
		if (this.#onchangeHandler && this.isValid()) {
			this.#onchangeHandler(this, options);
		}
	}
}

function validateRequired(s: string | undefined): boolean {
	return !isEmpty(s);
}

function validateNumber(s: string | undefined): boolean {
	if (isEmpty(s)) return true;
	const num = Number(s);
	return Number.isSafeInteger(num) && num.toString() == s;
}

function validateStartAndEndDate(start: string | undefined, end: string | undefined): boolean {
	if (isEmpty(start)) return true;
	if (isEmpty(end)) return true;
	const startNum = Number(start);
	const endNum = Number(end);
	return startNum <= endNum;
}

function validateMaxLength(s: string | undefined, maxLength: number): boolean {
	if (isEmpty(s)) return true;
	return s!.length <= maxLength;
}

function isEmpty(s: string | undefined): boolean {
	return s == null || s.length === 0;
}
