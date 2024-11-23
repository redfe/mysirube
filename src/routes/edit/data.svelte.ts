export class EditData {
	#start?: string = $state();
	#end?: string = $state();
	#title?: string = $state();
	#color?: string = $state();
	#errors: { start?: string; end?: string; title?: string; color?: string } = $state({});

	constructor(args?: { start?: string; end?: string; title?: string; color?: string }) {
		this.#start = args?.start;
		this.#end = args?.end;
		this.#title = args?.title;
		this.#color = args?.color;
		this.validate();
	}

	set start(start: string | undefined) {
		this.#start = start;
		this.validate('start');
	}

	get start() {
		return this.#start;
	}

	set end(end: string | undefined) {
		this.#end = end;
		this.validate('end');
	}

	get end() {
		return this.#end;
	}

	set title(title: string | undefined) {
		this.#title = title;
		this.validate('title');
	}

	get title() {
		return this.#title;
	}

	set color(color: string | undefined) {
		this.#color = color;
	}

	get color() {
		return this.#color;
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

	get errors() {
		return this.#errors;
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

function isEmpty(s: string | undefined): boolean {
	return s == null || s.length === 0;
}
