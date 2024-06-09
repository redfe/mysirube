import { isInvalidDate, Level, selectUnit } from '$lib/dateUtils';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export async function load({ params }) {
	const unit = selectUnit(params.unit);
	if (!unit) {
		error(404);
	}
	const datetime = new Date(params.datetime);
	if (isInvalidDate(datetime)) {
		error(404);
	}
	const form = {
		unitLevel: unit.level < Level.ByYear ? Level.ByYear : unit.level,
		startDate: datetime,
		endDate: datetime,
		tags: '',
		content: ''
	};

	return { form };
}

const schema = z.object({
	id: z.string(),
	unitLevel: z.string({ required_error: '入力して下さい。' }).refine(
		(arg) => {
			return ![Level.ByMonth, Level.ByDay, Level.ByHour, Level.ByMinute, Level.BySecond].includes(
				// @ts-ignore
				new Number(arg)
			);
		},
		{ message: '不正な値です。' }
	),
	startDate: z.string({ required_error: '入力して下さい。' }).refine(
		(arg) => {
			return !isInvalidDate(new Date(arg));
		},
		{ message: '不正な日付です。' }
	),
	endDate: z
		.string()
		.optional()
		.refine(
			(arg) => {
				return !arg || !isInvalidDate(new Date(arg));
			},
			{ message: '不正な日付です。' }
		),
	tags: z.string({ required_error: '入力して下さい。' }).refine(
		(arg) => {
			return arg.trim().split(/[\u{20}\u{3000}]/u).length <= 5;
		},
		{ message: '5つ以内で入力して下さい' }
	),
	content: z
		.string({ required_error: '入力して下さい。' })
		.max(2000, { message: '2000文字以内で入力して下さい。' })
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log({ data });
		const form = await superValidate(data, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		// TODO 保存
		//save({ ...form.data, id: randomUUID() });
		return redirect(302, 'add/success');
	}
};
