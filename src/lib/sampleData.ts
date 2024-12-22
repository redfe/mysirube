import type { Data } from './repository';

export const sampleData: Data[] = [
	{ id: 'a1b2c3d4', start: -3000, title: 'メソポタミア：シュメール文明の成立', color: 'gold' },
	{ id: 'e5f6g7h8', start: -2560, title: 'エジプト：クフ王の大ピラミッド完成', color: 'gold' },
	{ id: 'i9j0k1l2', start: -1700, title: 'インド：インダス文明の衰退', color: 'gray' },
	{ id: 'm3n4o5p6', start: -800, end: -338, title: 'ギリシャ：ポリスの時代', color: 'blue' },
	{ id: 'q7r8s9t0', start: -551, title: '中国：孔子の誕生', color: 'gray' },
	{ id: 'u1v2w3x4', start: -400, end: 476, title: 'ヨーロッパ：ローマ帝国の隆盛', color: 'blue' },
	{ id: 'y5z6a7b8', start: -300, title: 'インド：マウリヤ朝の成立', color: 'gray' },
	{ id: 'c9d0e1f2', start: 538, title: '日本：仏教伝来（異説あり）', color: 'purple' },
	{ id: 'g3h4i5j6', start: 593, title: '日本：聖徳太子が摂政に就任', color: 'purple' },
	{ id: 'k7l8m9n0', start: 604, title: '日本：十七条の憲法制定', color: 'purple' },
	{ id: 'o1p2q3r4', start: 607, title: '日本：遣隋使派遣（小野妹子）', color: 'purple' },
	{ id: 's5t6u7v8', start: 618, title: '中国：唐の建国', color: 'gray' },
	{ id: 'w9x0y1z2', start: 645, title: '日本：大化の改新', color: 'purple' },
	{ id: 'a3b4c5d6', start: 663, title: '日本：白村江の戦い', color: 'purple', subColor: 'red' },
	{ id: 'e7f8g9h0', start: 710, title: '日本：平城京遷都', color: 'purple' },
	{ id: 'i1j2k3l4', start: 794, title: '日本：平安京遷都', color: 'purple' },
	{
		id: 'm5n6o7p8',
		start: 800,
		end: 1000,
		title: 'ヨーロッパ：ヴァイキングの活動',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'q9r0s1t2',
		start: 1066,
		title: 'ヨーロッパ：ノルマン・コンクエスト',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'u3v4w5x6',
		start: 1096,
		end: 1291,
		title: 'ヨーロッパ：十字軍',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'y7z8a9b0', start: 1185, title: '日本：鎌倉幕府成立', color: 'purple' },
	{ id: 'c1d2e3f4', start: 1192, title: '日本：源頼朝が征夷大将軍に任じられる', color: 'purple' },
	{
		id: 'g5h6i7j8',
		start: 1206,
		title: 'モンゴル：チンギス・ハンがモンゴル帝国を建国',
		color: 'gray',
		subColor: 'red'
	},
	{
		id: 'k9l0m1n2',
		start: 1215,
		title: 'ヨーロッパ：マグナ・カルタ（大憲章）が制定される',
		color: 'blue'
	},
	{
		id: 'o3p4q5r6',
		start: 1274,
		title: '日本：元寇（文永の役）',
		color: 'purple',
		subColor: 'red'
	},
	{
		id: 's7t8u9v0',
		start: 1281,
		title: '日本：元寇（弘安の役）',
		color: 'purple',
		subColor: 'red'
	},
	{ id: 'w1x2y3z4', start: 1333, title: '日本：鎌倉幕府滅亡', color: 'purple' },
	{ id: 'a5b6c7d8', start: 1338, title: '日本：足利尊氏が室町幕府を開く', color: 'purple' },
	{
		id: 'e9f0g1h2',
		start: 1348,
		end: 1351,
		title: 'ヨーロッパ：黒死病の大流行',
		color: 'blue',
		subColor: 'black'
	},
	{
		id: 'i3j4k5l6',
		start: 1402,
		title: 'オスマン帝国：アンカラの戦い',
		color: 'gold',
		subColor: 'red'
	},
	{
		id: 'm7n8o9p0',
		start: 1453,
		title: 'オスマン帝国：コンスタンティノープル陥落',
		color: 'gold',
		subColor: 'red'
	},
	{ id: 'q1r2s3t4', start: 1492, title: 'ヨーロッパ：コロンブスのアメリカ大陸到達', color: 'blue' },
	{
		id: 'u5v6w7x8',
		start: 1517,
		title: 'ヨーロッパ：マルティン・ルターが宗教改革を開始',
		color: 'blue'
	},
	{ id: 'y9z0a1b2', start: 1543, title: '日本：鉄砲伝来', color: 'purple' },
	{ id: 'c3d4e5f6', start: 1549, title: '日本：フランシスコ・ザビエルが来日', color: 'purple' },
	{ id: 'g7h8i9j0', start: 1573, title: '日本：織田信長が室町幕府を滅ぼす', color: 'purple' },
	{ id: 'k1l2m3n4', start: 1582, title: '日本：本能寺の変', color: 'purple', subColor: 'red' },
	{
		id: 'o5p6q7r8',
		start: 1588,
		title: 'イギリス：アルマダの海戦',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 's9t0u1v2', start: 1600, title: '日本：関ヶ原の戦い', color: 'purple', subColor: 'red' },
	{ id: 'w3x4y5z6', start: 1603, title: '日本：江戸幕府成立', color: 'purple' },
	{
		id: 'a7b8c9d0',
		start: 1618,
		end: 1648,
		title: 'ヨーロッパ：三十年戦争',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'c1d2e3f4', start: 1192, title: '日本：源頼朝が征夷大将軍に任じられる', color: 'purple' },
	{
		id: 'g5h6i7j8',
		start: 1206,
		title: 'モンゴル：チンギス・ハンがモンゴル帝国を建国',
		color: 'gray',
		subColor: 'red'
	},
	{
		id: 'k9l0m1n2',
		start: 1215,
		title: 'ヨーロッパ：マグナ・カルタ（大憲章）が制定される',
		color: 'blue'
	},
	{
		id: 'o3p4q5r6',
		start: 1274,
		title: '日本：元寇（文永の役）',
		color: 'purple',
		subColor: 'red'
	},
	{
		id: 's7t8u9v0',
		start: 1281,
		title: '日本：元寇（弘安の役）',
		color: 'purple',
		subColor: 'red'
	},
	{ id: 'w1x2y3z4', start: 1333, title: '日本：鎌倉幕府滅亡', color: 'purple' },
	{ id: 'a5b6c7d8', start: 1338, title: '日本：足利尊氏が室町幕府を開く', color: 'purple' },
	{
		id: 'e9f0g1h2',
		start: 1348,
		end: 1351,
		title: 'ヨーロッパ：黒死病の大流行',
		color: 'blue',
		subColor: 'black'
	},
	{
		id: 'i3j4k5l6',
		start: 1402,
		title: 'オスマン帝国：アンカラの戦い',
		color: 'gold',
		subColor: 'red'
	},
	{
		id: 'm7n8o9p0',
		start: 1453,
		title: 'オスマン帝国：コンスタンティノープル陥落',
		color: 'gold',
		subColor: 'red'
	},
	{ id: 'q1r2s3t4', start: 1492, title: 'ヨーロッパ：コロンブスのアメリカ大陸到達', color: 'blue' },
	{
		id: 'u5v6w7x8',
		start: 1517,
		title: 'ヨーロッパ：マルティン・ルターが宗教改革を開始',
		color: 'blue'
	},
	{ id: 'y9z0a1b2', start: 1543, title: '日本：鉄砲伝来', color: 'purple' },
	{ id: 'c3d4e5f6', start: 1549, title: '日本：フランシスコ・ザビエルが来日', color: 'purple' },
	{ id: 'g7h8i9j0', start: 1573, title: '日本：織田信長が室町幕府を滅ぼす', color: 'purple' },
	{ id: 'k1l2m3n4', start: 1582, title: '日本：本能寺の変', color: 'purple', subColor: 'red' },
	{
		id: 'o5p6q7r8',
		start: 1588,
		title: 'イギリス：アルマダの海戦',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 's9t0u1v2', start: 1600, title: '日本：関ヶ原の戦い', color: 'purple', subColor: 'red' },
	{ id: 'w3x4y5z6', start: 1603, title: '日本：江戸幕府成立', color: 'purple' },
	{
		id: 'a7b8c9d0',
		start: 1618,
		end: 1648,
		title: 'ヨーロッパ：三十年戦争',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'g1h2i3j4',
		start: 1941,
		title: '12/08 アメリカ：真珠湾攻撃',
		color: 'green',
		subColor: 'red'
	},
	{
		id: 'k5l6m7n8',
		start: 1945,
		title: '08/06 日本：広島への原爆投下',
		color: 'purple',
		subColor: 'red'
	},
	{
		id: 'o9p0q1r2',
		start: 1945,
		title: '08/09 日本：長崎への原爆投下',
		color: 'purple',
		subColor: 'red'
	},
	{
		id: 's3t4u5v6',
		start: 1945,
		title: '08/15 日本：第二次世界大戦終結（終戦の日）',
		color: 'purple'
	},
	{ id: 'w7x8y9z0', start: 1947, title: 'インド：インドとパキスタンが分離独立', color: 'gray' },
	{ id: 'a1b2c3d4', start: 1948, title: 'イスラエル：イスラエル建国', color: 'gold' },
	{ id: 'e5f6g7h8', start: 1949, title: '中国：中華人民共和国成立', color: 'gray' },
	{
		id: 'i9j0k1l2',
		start: 1950,
		end: 1953,
		title: '朝鮮：朝鮮戦争',
		color: 'gray',
		subColor: 'red'
	},
	{
		id: 'm3n4o5p6',
		start: 1951,
		title: '09/08 日本：サンフランシスコ講和条約調印',
		color: 'purple'
	},
	{
		id: 'q7r8s9t0',
		start: 1954,
		title: 'ベトナム：ジュネーヴ協定成立、ベトナム南北分断',
		color: 'gray'
	},
	{
		id: 'u1v2w3x4',
		start: 1956,
		title: 'エジプト：スエズ運河国有化宣言、第二次中東戦争',
		color: 'pink',
		subColor: 'red'
	},
	{
		id: 'y5z6a7b8',
		start: 1961,
		title: 'ドイツ：ベルリンの壁建設',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'c9d0e1f2', start: 1962, title: 'アメリカ：キューバ危機', color: 'green', subColor: 'red' },
	{ id: 'g3h4i5j6', start: 1964, title: 'アメリカ：公民権法成立', color: 'green' },
	{
		id: 'k7l8m9n0',
		start: 1965,
		end: 1975,
		title: 'ベトナム：ベトナム戦争',
		color: 'gray',
		subColor: 'red'
	},
	{ id: 'o1p2q3r4', start: 1969, title: 'アメリカ：アポロ11号月面着陸', color: 'green' },
	{
		id: 's5t6u7v8',
		start: 1973,
		title: 'チリ：チリ・クーデター',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{ id: 'w9x0y1z2', start: 1975, title: 'ベトナム：ベトナム戦争終結、ベトナム統一', color: 'gray' },
	{ id: 'a3b4c5d6', start: 1979, title: 'イラン：イラン革命', color: 'gold', subColor: 'red' },
	{ id: 'e7f8g9h0', start: 1989, title: 'ドイツ：ベルリンの壁崩壊', color: 'blue' },
	{ id: 'j1k2l3m4', start: 1989, title: 'アメリカ：マルタ会談、冷戦終結宣言', color: 'green' },
	{ id: 'n5o6p7q8', start: 1990, title: 'ドイツ：ドイツ再統一', color: 'blue' },
	{ id: 'r9s0t1u2', start: 1991, title: 'ソビエト連邦：ソビエト連邦崩壊', color: 'blue' },
	{ id: 'v3w4x5y6', start: 1991, title: '湾岸戦争', color: 'gold', subColor: 'red' },
	{ id: 'z7a8b9c0', start: 1993, title: 'ヨーロッパ：欧州連合（EU）発足', color: 'blue' },
	{
		id: 'd1e2f3g4',
		start: 1995,
		title: '01/17 日本：阪神・淡路大震災',
		color: 'purple',
		subColor: 'black'
	},
	{ id: 'h5i6j7k8', start: 1995, title: '世界：世界貿易機関（WTO）発足', color: 'gray' },
	{
		id: 'l9m0n1o2',
		start: 2001,
		title: '09/11 アメリカ：アメリカ同時多発テロ事件',
		color: 'green',
		subColor: 'red'
	},
	{ id: 'p3q4r5s6', start: 2001, title: 'アフガニスタン紛争開始', color: 'gray', subColor: 'red' },
	{ id: 't7u8v9w0', start: 2003, title: 'イラク戦争', color: 'gold', subColor: 'red' },
	{ id: 'x1y2z3a4', start: 2004, title: 'ヨーロッパ：EU大規模拡大', color: 'blue' },
	{ id: 'b5c6d7e8', start: 2008, title: '世界：リーマン・ショック', color: 'gray' },
	{
		id: 'f9g0h1i2',
		start: 2011,
		title: '03/11 日本：東日本大震災',
		color: 'purple',
		subColor: 'black'
	},
	{ id: 'j3k4l5m6', start: 2011, title: 'アラブの春', color: 'gold', subColor: 'red' },
	{
		id: 'n7o8p9q0',
		start: 2016,
		title: 'イギリス：イギリスのEU離脱（ブレグジット）国民投票',
		color: 'blue'
	},
	{
		id: 'r1s2t3u4',
		start: 2019,
		title: '世界：新型コロナウイルス感染症（COVID-19）パンデミック開始',
		color: 'black'
	},
	{
		id: 'v5w6x7y8',
		start: 2022,
		title: 'ロシア：ロシアによるウクライナ侵攻',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'z9a0b1c2', start: 1989, end: 1991, title: '東欧革命', color: 'blue' },
	{
		id: 'd3e4f5g6',
		start: 1992,
		end: 1995,
		title: 'ボスニア・ヘルツェゴビナ紛争',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'h7i8j9k0', start: 1994, title: '南アフリカ：アパルトヘイト廃止', color: 'pink' }
]
	.map((data) => ({ ...data, id: crypto.randomUUID() }))
	.reduce((acc, cur) => {
		if (!acc.find((data) => data.title === cur.title)) {
			acc.push(cur as Data);
		}
		return acc;
	}, [] as Data[]);
