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
		subColor: 'black'
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
	{ id: 'h7i8j9k0', start: 1994, title: '南アフリカ：アパルトヘイト廃止', color: 'pink' },
	{ id: 'p1q2r3s4', start: 1910, title: '日本：韓国併合', color: 'purple' },
	{ id: 't5u6v7w8', start: 1911, title: '中国：辛亥革命', color: 'gray' },
	{
		id: 'x9y0z1a2',
		start: 1915,
		title: 'オスマン帝国：アルメニア人虐殺',
		color: 'gold',
		subColor: 'red'
	},
	{ id: 'b3c4d5e6', start: 1919, title: 'ドイツ：ヴェルサイユ条約締結', color: 'blue' },
	{
		id: 'f7g8h9i0',
		start: 1922,
		title: 'イタリア：ムッソリーニが首相に就任、ファシズム体制確立',
		color: 'blue'
	},
	{ id: 'j1k2l3m4', start: 1923, title: '日本：関東大震災', color: 'purple', subColor: 'black' },
	{
		id: 'n5o6p7q8',
		start: 1929,
		title: 'アメリカ：世界恐慌の始まり（暗黒の木曜日）',
		color: 'green'
	},
	{ id: 'r9s0t1u2', start: 1931, title: '日本：満州事変', color: 'purple', subColor: 'red' },
	{
		id: 'v3w4x5y6',
		start: 1933,
		title: 'ドイツ：ヒトラーが首相に就任、ナチス政権成立',
		color: 'blue'
	},
	{
		id: 'z7a8b9c0',
		start: 1936,
		end: 1939,
		title: 'スペイン：スペイン内戦',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'd1e2f3g4', start: 1937, title: '日本：日中戦争勃発', color: 'purple', subColor: 'red' },
	{
		id: 'h5i6j7k8',
		start: 1940,
		title: 'フランス：フランスがドイツに降伏',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'l9m0n1o2', start: 1941, title: 'アメリカ：大西洋憲章発表', color: 'green' },
	{ id: 'p3q4r5s6', start: 1947, title: 'アメリカ：マーシャル・プラン発表', color: 'green' },
	{
		id: 't7u8v9w0',
		start: 1948,
		title: 'チェコスロバキア：チェコスロバキアクーデター',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'x1y2z3a4',
		start: 1948,
		end: 1949,
		title: 'ドイツ：ベルリン封鎖',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'b5c6d7e8', start: 1949, title: 'ヨーロッパ：北大西洋条約機構（NATO）設立', color: 'blue' },
	{ id: 'f9g0h1i2', start: 1950, title: 'アジア：中ソ友好同盟条約締結', color: 'gray' },
	{ id: 'j3k4l5m6', start: 1953, title: 'ソ連：スターリン死去', color: 'blue' },
	{
		id: 'n7o8p9q0',
		start: 1956,
		title: 'ハンガリー：ハンガリー動乱',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'g1h2i3j4', start: 1701, title: 'スペイン継承戦争勃発', color: 'blue', subColor: 'red' },
	{
		id: 'k5l6m7n8',
		start: 1707,
		title: 'イングランド王国とスコットランド王国が合併し、グレートブリテン王国成立',
		color: 'blue'
	},
	{
		id: 'o9p0q1r2',
		start: 1714,
		title: 'アン女王の死により、ハノーヴァー朝がイギリスで始まる',
		color: 'blue'
	},
	{
		id: 's3t4u5v6',
		start: 1720,
		title: 'イギリス：南海泡沫事件',
		color: 'blue',
		subColor: 'black'
	},
	{
		id: 'w7x8y9z0',
		start: 1721,
		title: 'ロシア：ピョートル1世が皇帝となり、ロシア帝国成立',
		color: 'gray'
	},
	{
		id: 'a1b2c3d4',
		start: 1733,
		end: 1738,
		title: 'ポーランド継承戦争',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'e5f6g7h8',
		start: 1740,
		end: 1748,
		title: 'オーストリア継承戦争',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'i9j0k1l2', start: 1755, title: '日本：田沼意次が老中となる', color: 'purple' },
	{ id: 'm3n4o5p6', start: 1762, title: 'ロシア：エカチェリーナ2世が即位', color: 'gray' },
	{ id: 'q7r8s9t0', start: 1765, title: 'イギリス：印紙法制定', color: 'blue', subColor: 'red' },
	{
		id: 'u1v2w3x4',
		start: 1770,
		title: 'アメリカ：ボストン虐殺事件',
		color: 'green',
		subColor: 'red'
	},
	{
		id: 'y5z6a7b8',
		start: 1773,
		title: 'アメリカ：ボストン茶会事件',
		color: 'green',
		subColor: 'red'
	},
	{ id: 'c9d0e1f2', start: 1776, title: 'アメリカ：アメリカ独立宣言', color: 'green' },
	{ id: 'g3h4i5j6', start: 1785, title: '日本：天明の飢饉', color: 'purple', subColor: 'black' },
	{ id: 'k7l8m9n0', start: 1787, title: 'アメリカ：アメリカ合衆国憲法制定', color: 'green' },
	{
		id: 'o1p2q3r4',
		start: 1789,
		title: 'フランス：バスティーユ襲撃、フランス革命勃発',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 's5t6u7v8',
		start: 1791,
		title: 'フランス：国王ルイ16世一家が逃亡を企てる（ヴァレンヌ事件）',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'w9x0y1z2', start: 1792, title: 'フランス：フランス第一共和政樹立', color: 'blue' },
	{ id: 'a3b4c5d6', start: 1793, title: 'フランス：ルイ16世処刑', color: 'blue', subColor: 'red' },
	{
		id: 'e7f8g9h0',
		start: 1799,
		title: 'フランス：ナポレオンがブリュメール18日のクーデターを起こし、統領政府を樹立',
		color: 'blue'
	},
	{
		id: 'v1w2x3y4',
		start: 1805,
		title: 'イギリス：トラファルガーの海戦',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'z5a6b7c8',
		start: 1810,
		title: 'メキシコ：メキシコ独立革命開始',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{
		id: 'd9e0f1g2',
		start: 1812,
		title: 'フランス：ナポレオンのロシア遠征',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'h3i4j5k6',
		start: 1819,
		title: 'アメリカ：アダムズ＝オニス条約締結、フロリダがアメリカ合衆国領に',
		color: 'green'
	},
	{
		id: 'l7m8n9o0',
		start: 1820,
		title: 'スペイン：スペイン立憲革命',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'p1q2r3s4',
		start: 1821,
		title: 'ギリシャ：ギリシャ独立戦争開始',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 't5u6v7w8',
		start: 1825,
		title: 'ロシア：デカブリストの乱',
		color: 'gray',
		subColor: 'red'
	},
	{ id: 'x9y0z1a2', start: 1830, title: 'フランス：七月革命', color: 'blue', subColor: 'red' },
	{ id: 'b3c4d5e6', start: 1832, title: 'イギリス：第一回選挙法改正', color: 'blue' },
	{ id: 'f7g8h9i0', start: 1837, title: 'イギリス：ヴィクトリア女王即位', color: 'blue' },
	{
		id: 'j1k2l3m4',
		start: 1839,
		end: 1842,
		title: '中国：アヘン戦争',
		color: 'gray',
		subColor: 'red'
	},
	{
		id: 'n5o6p7q8',
		start: 1845,
		title: 'アイルランド：ジャガイモ飢饉（大飢饉）',
		color: 'blue',
		subColor: 'black'
	},
	{
		id: 'r9s0t1u2',
		start: 1848,
		title: 'ヨーロッパ各地：1848年革命（諸国民の春）',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'v3w4x5y6', start: 1850, title: '中国：太平天国の乱', color: 'gray', subColor: 'red' },
	{ id: 'z7a8b9c0', start: 1853, title: '日本：ペリー来航', color: 'purple' },
	{ id: 'd1e2f3g4', start: 1854, end: 1856, title: 'クリミア戦争', color: 'blue', subColor: 'red' },
	{
		id: 'h5i6j7k8',
		start: 1857,
		title: 'インド：インド大反乱（セポイの反乱）',
		color: 'gray',
		subColor: 'red'
	},
	{ id: 'l9m0n1o2', start: 1860, title: 'イタリア：イタリア統一運動', color: 'blue' },
	{ id: 'p3q4r5s6', start: 1861, title: 'ロシア：農奴解放令', color: 'gray' },
	{ id: 't7u8v9w0', start: 1863, title: 'アメリカ：奴隷解放宣言', color: 'green' },
	{
		id: 'g1h2i3j4',
		start: 1513,
		title: 'スペイン：フアン・ポンセ・デ・レオンがフロリダに到達',
		color: 'yellowgreen'
	},
	{
		id: 'k5l6m7n8',
		start: 1519,
		end: 1521,
		title: 'スペイン：エルナン・コルテスがアステカ帝国を征服',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{
		id: 'o9p0q1r2',
		start: 1524,
		title: 'イタリア：ジョヴァンニ・ダ・ヴェラッツァーノがフランス王の命で北米を探検',
		color: 'blue'
	},
	{
		id: 's3t4u5v6',
		start: 1532,
		end: 1533,
		title: 'スペイン：フランシスコ・ピサロがインカ帝国を征服',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{
		id: 'w7x8y9z0',
		start: 1534,
		end: 1542,
		title: 'フランス：ジャック・カルティエが北米を探検し、セントローレンス川を発見',
		color: 'blue'
	},
	{
		id: 'a1b2c3d4',
		start: 1539,
		end: 1543,
		title: 'スペイン：エルナンド・デ・ソトがミシシッピ川を探検',
		color: 'yellowgreen'
	},
	{
		id: 'e5f6g7h8',
		start: 1540,
		end: 1542,
		title: 'スペイン：フランシスコ・バスケス・デ・コロナドがアメリカ南西部を探検',
		color: 'yellowgreen'
	},
	{
		id: 'i9j0k1l2',
		start: 1562,
		title: 'フランス：フロリダにユグノー教徒の植民地を建設しようとする試み',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'm3n4o5p6',
		start: 1565,
		title:
			'スペイン：フロリダにセントオーガスティンを建設（北米で最も古いヨーロッパ人の定住地の一つ）',
		color: 'yellowgreen'
	},
	{
		id: 'q7r8s9t0',
		start: 1579,
		title: 'イギリス：フランシス・ドレークが北米西海岸を探検',
		color: 'blue'
	},
	{
		id: 'u1v2w3x4',
		start: 1585,
		title: 'イギリス：ロアノーク植民地の最初の試み',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'y5z6a7b8',
		start: 1587,
		title: 'イギリス：ロアノーク植民地の2度目の試み（失われた植民地）',
		color: 'blue',
		subColor: 'black'
	},
	{
		id: 'c9d0e1f2',
		start: 1598,
		title: 'スペイン：フアン・デ・オニャーテがニューメキシコを植民地化',
		color: 'yellowgreen'
	},
	{
		id: 'g3h4i5j6',
		start: 1500,
		title: 'ブラジル：ポルトガル人がブラジルに到達',
		color: 'yellowgreen'
	},
	{
		id: 'k7l8m9n0',
		start: 1519,
		title: 'マゼランの世界一周航海開始（南米南端のマゼラン海峡通過）',
		color: 'yellowgreen'
	},
	{
		id: 'o1p2q3r4',
		start: 1534,
		title: 'ピサロがクスコを占領し、インカ帝国の支配を確立',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{
		id: 's5t6u7v8',
		start: 1536,
		title: 'ブエノスアイレスの最初の植民地が建設される',
		color: 'yellowgreen'
	},
	{
		id: 'w9x0y1z2',
		start: 1541,
		title: 'チリの征服がペドロ・デ・バルディビアによって開始される',
		color: 'yellowgreen'
	},
	{ id: 'a3b4c5d6', start: 1567, title: 'ロンドン証券取引所設立', color: 'blue' },
	{
		id: 'e7f8g9h0',
		start: 1588,
		title: '英西戦争、アルマダの海戦',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'p1q2r3s4',
		start: 1607,
		title: 'イギリス：ジェームズタウン植民地建設（バージニア植民地）',
		color: 'blue'
	},
	{ id: 't5u6v7w8', start: 1608, title: 'フランス：ケベック植民地建設', color: 'blue' },
	{
		id: 'x9y0z1a2',
		start: 1609,
		title: 'イギリス：ヘンリー・ハドソンがハドソン川を探検',
		color: 'blue'
	},
	{
		id: 'b3c4d5e6',
		start: 1619,
		title: 'バージニア植民地：アフリカ人奴隷が初めて北アメリカに連れてこられる',
		color: 'blue',
		subColor: 'black'
	},
	{
		id: 'f7g8h9i0',
		start: 1620,
		title: 'イギリス：メイフラワー号がプリマス植民地に到着',
		color: 'blue'
	},
	{
		id: 'j1k2l3m4',
		start: 1622,
		title: 'バージニア植民地：先住民による大規模な攻撃（1622年のインディアン大虐殺）',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'n5o6p7q8',
		start: 1624,
		title: 'オランダ：ニューネーデルラント植民地設立',
		color: 'orange'
	},
	{
		id: 'r9s0t1u2',
		start: 1626,
		title: 'オランダ：マンハッタン島を先住民から購入',
		color: 'orange'
	},
	{ id: 'v3w4x5y6', start: 1630, title: 'イギリス：マサチューセッツ湾植民地設立', color: 'blue' },
	{ id: 'z7a8b9c0', start: 1634, title: 'メリーランド植民地設立', color: 'blue' },
	{ id: 'd1e2f3g4', start: 1636, title: 'ロードアイランド植民地設立', color: 'blue' },
	{ id: 'h5i6j7k8', start: 1637, title: 'ピクォート戦争', color: 'blue', subColor: 'red' },
	{
		id: 'l9m0n1o2',
		start: 1664,
		title: 'イギリス：イギリスがニューネーデルラントを占領し、ニューヨークに改名',
		color: 'blue'
	},
	{
		id: 'p3q4r5s6',
		start: 1675,
		end: 1676,
		title: 'フィリップ王戦争（メタコメット戦争）',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 't7u8v9w0',
		start: 1676,
		title: 'バージニア植民地：ベーコンの反乱',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'x1y2z3a4', start: 1680, title: 'プエブロの反乱', color: 'yellowgreen', subColor: 'red' },
	{
		id: 'b5c6d7e8',
		start: 1682,
		title: 'フランス：ラ・サールがミシシッピ川を下り、ルイジアナと命名',
		color: 'blue'
	},
	{
		id: 'f9g0h1i2',
		start: 1688,
		title: 'クエーカー教徒によるペンシルベニア植民地設立',
		color: 'blue'
	},
	{
		id: 'j3k4l5m6',
		start: 1689,
		end: 1697,
		title: 'ウィリアム王戦争（フレンチ・インディアン戦争の一部）',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'n7o8p9q0', start: 1692, title: 'セイラム魔女裁判', color: 'blue', subColor: 'black' },
	{ id: 'g1h2i3j4', start: 1054, title: '教会大分裂（東西教会の分裂）', color: 'blue' },
	{ id: 'k5l6m7n8', start: 1066, title: 'ノルマン・コンクエスト', color: 'blue', subColor: 'red' },
	{ id: 's3t4u5v6', start: 1185, title: '日本：鎌倉幕府成立', color: 'purple' },
	{ id: 'e5f6g7h8', start: 1215, title: 'イングランド：マグナ・カルタ署名', color: 'blue' },
	{ id: 'i9j0k1l2', start: 1227, title: 'モンゴル帝国：チンギス・ハン死去', color: 'gray' },
	{
		id: 'm3n4o5p6',
		start: 1274,
		title: '日本：元寇（文永の役）',
		color: 'purple',
		subColor: 'red'
	},
	{
		id: 'q7r8s9t0',
		start: 1281,
		title: '日本：元寇（弘安の役）',
		color: 'purple',
		subColor: 'red'
	},
	{
		id: 'u1v2w3x4',
		start: 1309,
		end: 1376,
		title: '教皇のバビロン捕囚',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'y5z6a7b8',
		start: 1315,
		end: 1317,
		title: 'ヨーロッパ大飢饉',
		color: 'blue',
		subColor: 'black'
	},
	{ id: 'c9d0e1f2', start: 1337, end: 1453, title: '百年戦争', color: 'blue', subColor: 'red' },
	{ id: 'g3h4i5j6', start: 1347, end: 1351, title: '黒死病（ペスト）の大流行', color: 'black' },
	{ id: 'k7l8m9n0', start: 1368, title: '中国：明王朝成立', color: 'gray' },
	{ id: 'o1p2q3r4', start: 1392, title: '日本：南北朝合一', color: 'purple' },
	{
		id: 's5t6u7v8',
		start: 1402,
		title: 'オスマン帝国：アンカラの戦い',
		color: 'gold',
		subColor: 'red'
	},
	{ id: 'w9x0y1z2', start: 1415, title: 'アジャンクールの戦い', color: 'blue', subColor: 'red' },
	{
		id: 'a3b4c5d6',
		start: 1429,
		title: 'ジャンヌ・ダルクのオルレアン解放',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'e7f8g9h0',
		start: 1453,
		title: 'オスマン帝国：コンスタンティノープル陥落',
		color: 'gold',
		subColor: 'red'
	},
	{ id: 'g1h2i3j4', start: 4, title: 'イエス・キリストの降誕（推定）', color: 'blue' },
	{ id: 'k5l6m7n8', start: 64, title: 'ローマ帝国：ローマ大火', color: 'blue' },
	{
		id: 'o9p0q1r2',
		start: 70,
		title: 'ローマ帝国：エルサレム攻囲戦、第1次ユダヤ戦争終結',
		color: 'gold'
	},
	{ id: 's3t4u5v6', start: 313, title: 'ローマ帝国：ミラノ勅令（キリスト教公認）', color: 'blue' },
	{ id: 'w7x8y9z0', start: 395, title: 'ローマ帝国：東西に分裂', color: 'blue' },
	{ id: 'a1b2c3d4', start: 410, title: '西ゴート族によるローマ略奪', color: 'blue' },
	{ id: 'e5f6g7h8', start: 476, title: '西ローマ帝国滅亡', color: 'blue' },
	{
		id: 'i9j0k1l2',
		start: 527,
		end: 565,
		title: '東ローマ帝国：ユスティニアヌス帝の治世',
		color: 'blue'
	},
	{ id: 'm3n4o5p6', start: 570, title: 'イスラム教：ムハンマドの誕生（推定）', color: 'gold' },
	{ id: 'q7r8s9t0', start: 618, title: '中国：唐王朝成立', color: 'gray' },
	{
		id: 'u1v2w3x4',
		start: 622,
		title: 'イスラム教：ヒジュラ（ムハンマドのメッカからメディナへの移住）',
		color: 'gold'
	},
	{ id: 'y5z6a7b8', start: 632, title: 'イスラム教：ムハンマド死去', color: 'gold' },
	{
		id: 'c9d0e1f2',
		start: 632,
		end: 750,
		title: 'イスラム帝国：正統カリフ時代、ウマイヤ朝',
		color: 'gold'
	},
	{
		id: 'g3h4i5j6',
		start: 711,
		title: 'ウマイヤ朝：イスラム軍がイベリア半島に侵入',
		color: 'gold'
	},
	{
		id: 'k7l8m9n0',
		start: 751,
		title: '中国：タラス河畔の戦い（唐とアッバース朝の戦い）',
		color: 'gray'
	},
	{
		id: 'o1p2q3r4',
		start: 800,
		title: 'フランク王国：カール大帝がローマ教皇から皇帝の戴冠を受ける',
		color: 'blue'
	},
	{ id: 's5t6u7v8', start: 814, title: 'フランク王国：カール大帝死去', color: 'blue' },
	{
		id: 'w9x0y1z2',
		start: 862,
		title: 'ルーシ：リューリクがノヴゴロド公となる（ルーシの起源）',
		color: 'blue'
	},
	{ id: 'a3b4c5d6', start: 907, title: '中国：唐王朝滅亡、五代十国時代へ', color: 'gray' },
	{ id: 'e7f8g9h0', start: 960, title: '中国：宋王朝成立', color: 'gray' },
	{ id: 'p1q2r3s4', start: 30, title: 'イエス・キリストの磔刑（推定）', color: 'blue' },
	{
		id: 't5u6v7w8',
		start: 117,
		end: 138,
		title: 'ローマ帝国：ハドリアヌス帝の治世',
		color: 'blue'
	},
	{ id: 'x9y0z1a2', start: 220, title: '中国：後漢滅亡、三国時代へ', color: 'gray' },
	{ id: 'b3c4d5e6', start: 280, end: 316, title: '西晋の内乱（八王の乱）', color: 'gray' },
	{ id: 'f7g8h9i0', start: 330, title: 'ローマ帝国：コンスタンティノープル遷都', color: 'blue' },
	{
		id: 'j1k2l3m4',
		start: 378,
		title: 'アドリアノープルの戦い、ローマ帝国が西ゴート族に敗北',
		color: 'blue'
	},
	{
		id: 'n5o6p7q8',
		start: 400,
		end: 450,
		title: 'グレートブリテン島へのアングロ・サクソン人の侵入',
		color: 'blue'
	},
	{
		id: 'r9s0t1u2',
		start: 451,
		title: 'カタラウヌムの戦い、西ローマ帝国と西ゴート族がフン族を撃退',
		color: 'blue'
	},
	{
		id: 'v3w4x5y6',
		start: 481,
		end: 511,
		title: 'フランク王国：クローヴィス1世の治世',
		color: 'blue'
	},
	{ id: 'z7a8b9c0', start: 535, end: 554, title: '東ローマ帝国：ゴート戦争', color: 'blue' },
	{ id: 'd1e2f3g4', start: 589, title: '日本：仏教公伝（諸説あり）', color: 'purple' },
	{ id: 'h5i6j7k8', start: 602, end: 628, title: '東突厥の最盛期', color: 'gray' },
	{ id: 'l9m0n1o2', start: 661, end: 750, title: 'ウマイヤ朝の拡大期', color: 'gold' },
	{
		id: 'p3q4r5s6',
		start: 732,
		title: 'トゥール・ポワティエ間の戦い、フランク王国がウマイヤ朝の侵攻を阻止',
		color: 'blue'
	},
	{
		id: 't7u8v9w0',
		start: 793,
		title: 'ヴァイキングによる最初のリンディスファーン襲撃',
		color: 'blue'
	},
	{
		id: 'x1y2z3a4',
		start: 800,
		end: 814,
		title: 'カール大帝の治世、カロリング・ルネサンス',
		color: 'blue'
	},
	{ id: 'b5c6d7e8', start: 820, end: 900, title: 'ヴァイキングの活動が活発化', color: 'blue' },
	{
		id: 'f9g0h1i2',
		start: 862,
		end: 879,
		title: 'キリルとメトディウスによるスラヴ人へのキリスト教布教',
		color: 'blue'
	},
	{
		id: 'j3k4l5m6',
		start: 878,
		title: 'アルフレッド大王がウェセックス王国の単独の支配者となる',
		color: 'blue'
	},
	{ id: 'n7o8p9q0', start: 900, end: 999, title: 'ノルマンディー公国成立', color: 'blue' },
	{
		id: 'aa1bb2cc3',
		start: 100,
		end: 700,
		title: 'テオティワカン文明の最盛期（推定）',
		color: 'yellowgreen'
	},
	{
		id: 'dd4ee5ff6',
		start: 200,
		end: 900,
		title: 'マヤ文明古典期の開始（推定）',
		color: 'yellowgreen'
	},
	{
		id: 'gg7hh8ii9',
		start: 400,
		end: 800,
		title: 'モチェ文化の繁栄（推定）',
		color: 'yellowgreen'
	},
	{
		id: 'jj0kk1ll2',
		start: 500,
		end: 900,
		title: 'ナスカ文化の最盛期（推定）',
		color: 'yellowgreen'
	},
	{
		id: 'mm3nn4oo5',
		start: 600,
		end: 900,
		title: '古典期マヤ文明の都市国家の隆盛',
		color: 'yellowgreen'
	},
	{
		id: 'pp6qq7rr8',
		start: 700,
		end: 1000,
		title: 'ティカルの繁栄（マヤ文明）',
		color: 'yellowgreen'
	},
	{
		id: 'ss9tt0uu1',
		start: 800,
		end: 1000,
		title: 'ホープウェル文化の衰退とミシシッピ文化の始まり（推定）',
		color: 'green'
	},

	{ id: 'p1q2r3s4', start: 30, title: 'イエス・キリストの磔刑（推定）', color: 'blue' },
	{
		id: 't5u6v7w8',
		start: 117,
		end: 138,
		title: 'ローマ帝国：ハドリアヌス帝の治世',
		color: 'blue'
	},
	{ id: 'x9y0z1a2', start: 220, title: '中国：後漢滅亡、三国時代へ', color: 'gray' },
	{ id: 'b3c4d5e6', start: 280, end: 316, title: '西晋の内乱（八王の乱）', color: 'gray' },
	{ id: 'f7g8h9i0', start: 330, title: 'ローマ帝国：コンスタンティノープル遷都', color: 'blue' },
	{
		id: 'j1k2l3m4',
		start: 378,
		title: 'アドリアノープルの戦い、ローマ帝国が西ゴート族に敗北',
		color: 'blue'
	},
	{
		id: 'n5o6p7q8',
		start: 400,
		end: 450,
		title: 'グレートブリテン島へのアングロ・サクソン人の侵入',
		color: 'blue'
	},
	{
		id: 'r9s0t1u2',
		start: 451,
		title: 'カタラウヌムの戦い、西ローマ帝国と西ゴート族がフン族を撃退',
		color: 'blue'
	},
	{
		id: 'v3w4x5y6',
		start: 481,
		end: 511,
		title: 'フランク王国：クローヴィス1世の治世',
		color: 'blue'
	},
	{ id: 'z7a8b9c0', start: 535, end: 554, title: '東ローマ帝国：ゴート戦争', color: 'blue' },
	{ id: 'd1e2f3g4', start: 589, title: '日本：仏教公伝（諸説あり）', color: 'purple' },
	{ id: 'h5i6j7k8', start: 602, end: 628, title: '東突厥の最盛期', color: 'gray' },
	{ id: 'l9m0n1o2', start: 661, end: 750, title: 'ウマイヤ朝の拡大期', color: 'gold' },
	{
		id: 'p3q4r5s6',
		start: 732,
		title: 'トゥール・ポワティエ間の戦い、フランク王国がウマイヤ朝の侵攻を阻止',
		color: 'blue'
	},
	{
		id: 't7u8v9w0',
		start: 793,
		title: 'ヴァイキングによる最初のリンディスファーン襲撃',
		color: 'blue'
	},
	{
		id: 'x1y2z3a4',
		start: 800,
		end: 814,
		title: 'カール大帝の治世、カロリング・ルネサンス',
		color: 'blue'
	},
	{ id: 'b5c6d7e8', start: 820, end: 900, title: 'ヴァイキングの活動が活発化', color: 'blue' },
	{
		id: 'f9g0h1i2',
		start: 862,
		end: 879,
		title: 'キリルとメトディウスによるスラヴ人へのキリスト教布教',
		color: 'blue'
	},
	{
		id: 'j3k4l5m6',
		start: 878,
		title: 'アルフレッド大王がウェセックス王国の単独の支配者となる',
		color: 'blue'
	},
	{ id: 'n7o8p9q0', start: 900, end: 999, title: 'ノルマンディー公国成立', color: 'blue' },
	{
		id: 'a1b2c3d4',
		start: -3000,
		end: -2500,
		title: 'インダス文明の始まり（推定）',
		color: 'gray'
	},
	{ id: 'e5f6g7h8', start: -3000, end: -2000, title: 'エジプト古王国時代', color: 'pink' },
	{ id: 'i9j0k1l2', start: -2700, end: -2500, title: 'ギザの大ピラミッド建設', color: 'pink' },
	{
		id: 'm3n4o5p6',
		start: -2500,
		end: -1500,
		title: 'メソポタミア：古バビロニア王国',
		color: 'gold'
	},
	{ id: 'q7r8s9t0', start: -2000, end: -1700, title: 'ミノア文明の最盛期', color: 'blue' },
	{ id: 'u1v2w3x4', start: -1700, end: -1500, title: 'ヒッタイト王国の成立', color: 'gold' },
	{ id: 'y5z6a7b8', start: -1600, end: -1100, title: '中国：殷王朝', color: 'gray' },
	{ id: 'c9d0e1f2', start: -1500, end: -1200, title: 'ミケーネ文明の最盛期', color: 'blue' },
	{
		id: 'g3h4i5j6',
		start: -1200,
		end: -1000,
		title: 'トロイア戦争（伝説に基づく年代）',
		color: 'blue'
	},
	{ id: 'k7l8m9n0', start: -1100, end: -256, title: '中国：周王朝', color: 'gray' },
	{ id: 'o1p2q3r4', start: -1000, end: -500, title: '古代ギリシア：幾何学時代', color: 'blue' },
	{
		id: 's5t6u7v8',
		start: -900,
		end: -600,
		title: '古代オリエント：アッシリア帝国の最盛期',
		color: 'gold'
	},
	{
		id: 'w9x0y1z2',
		start: -800,
		end: -300,
		title: '古代ギリシア：アルカイック時代',
		color: 'blue'
	},
	{ id: 'a3b4c5d6', start: -753, title: 'ローマ建国（伝承に基づく）', color: 'blue' },
	{ id: 'e7f8g9h0', start: -600, end: -400, title: '古代ペルシア：アケメネス朝', color: 'gold' },
	{ id: 'i1j2k3l4', start: -500, end: -300, title: '古代ギリシア：古典時代', color: 'blue' },
	{ id: 'm5n6o7p8', start: -400, end: -300, title: 'アレクサンドロス大王の東征', color: 'blue' },
	{ id: 'q9r0s1t2', start: -300, end: -30, title: '古代ローマ：共和政ローマ', color: 'blue' },
	{ id: 'u3v4w5x6', start: -221, title: '中国：秦の統一', color: 'gray' },
	{ id: 'y7z8a9b0', start: -206, end: 220, title: '中国：漢王朝', color: 'gray' },
	{
		id: 'zz1yy2xx3',
		start: -3200,
		end: -3000,
		title: 'エジプト先王朝時代：上エジプトと下エジプトの統一（推定）',
		color: 'pink'
	},
	{
		id: 'ww4vv5uu6',
		start: -3000,
		end: -2350,
		title: 'メソポタミア：シュメール文明の最盛期',
		color: 'gold'
	},
	{
		id: 'tt7ss8rr9',
		start: -2600,
		end: -2400,
		title: 'インダス文明：モヘンジョダロとハラッパーの都市建設',
		color: 'gray'
	},
	{
		id: 'qq0pp1oo2',
		start: -2300,
		end: -2000,
		title: 'メソポタミア：アッカド帝国の成立',
		color: 'gold'
	},
	{ id: 'oo3nn4mm5', start: -2100, end: -2000, title: 'ウル第3王朝', color: 'gold' },
	{
		id: 'mm6ll7kk8',
		start: -2000,
		end: -1900,
		title: 'ストーンヘンジの建設（第1期）',
		color: 'blue'
	},
	{ id: 'kk9jj0ii1', start: -1900, end: -1600, title: 'エジプト中王国時代', color: 'pink' },
	{
		id: 'ii2hh3gg4',
		start: -1800,
		end: -1500,
		title: 'バビロン第1王朝：ハンムラビ法典の制定',
		color: 'gold'
	},
	{ id: 'gg5ff6ee7', start: -1600, end: -1200, title: 'ヒッタイト王国：最盛期', color: 'gold' },
	{ id: 'ee8dd9cc0', start: -1550, end: -1070, title: 'エジプト新王国時代', color: 'pink' },
	{
		id: 'cc1bb2aa3',
		start: -1450,
		end: -1200,
		title: 'ミケーネ文明：線文字Bの解読',
		color: 'blue'
	},
	{ id: 'bb4aa5zz6', start: -1300, end: -1000, title: '中国：殷墟の建設', color: 'gray' },
	{
		id: 'aa7zz8yy9',
		start: -1200,
		end: -1100,
		title: 'トロイア戦争（史実に基づいた可能性）',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'yy0xx1ww2', start: -1180, title: '古代ギリシア：ドーリア人の南下', color: 'blue' },
	{
		id: 'xx3ww4vv5',
		start: -1000,
		end: -700,
		title: 'イラン高原：メディア王国の成立',
		color: 'gold'
	},
	{ id: 'vv6uu7tt8', start: -900, end: -600, title: '古代エジプト：第3中間期', color: 'pink' },
	{ id: 'uu9tt0ss1', start: -800, end: -500, title: '古代ギリシア：ポリスの成立', color: 'blue' },
	{
		id: 'ss2rr3qq4',
		start: -700,
		end: -600,
		title: '古代オリエント：新アッシリア帝国の最盛期',
		color: 'gold'
	},
	{ id: 'rr5qq6pp7', start: -660, title: '日本：神武天皇即位（伝承に基づく）', color: 'purple' },
	{
		id: 'pp8oo9nn0',
		start: -600,
		end: -300,
		title: '古代オリエント：新バビロニア王国',
		color: 'gold'
	},
	{
		id: 'nn1mm2ll3',
		start: -550,
		end: -330,
		title: 'アケメネス朝ペルシア帝国の最盛期',
		color: 'gold'
	},
	{ id: 'll4kk5jj6', start: -509, title: '古代ローマ：共和政の開始', color: 'blue' },
	{
		id: 'jj7ii8hh9',
		start: -499,
		end: -449,
		title: 'ペルシア戦争',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'hh0gg1ff2',
		start: -431,
		end: -404,
		title: 'ペロポネソス戦争',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'ff3ee4dd5',
		start: -336,
		end: -323,
		title: 'アレクサンドロス大王の東征とヘレニズム時代',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'dd6cc7bb8', start: -264, end: -146, title: 'ポエニ戦争', color: 'blue', subColor: 'red' },
	{ id: 'cc9bb0aa1', start: -146, title: 'カルタゴ滅亡', color: 'gold' },
	{
		id: 'bb2aa3zz4',
		start: -100,
		end: -44,
		title: '共和政ローマの末期：内乱の時代',
		color: 'blue',
		subColor: 'red'
	},
	{
		id: 'a1b2c3d4',
		start: -3000,
		end: -2500,
		title: 'インダス文明の始まり（推定）',
		color: 'gray'
	},
	{ id: 'e5f6g7h8', start: -3000, end: -2000, title: 'エジプト古王国時代', color: 'pink' },
	{ id: 'i9j0k1l2', start: -2700, end: -2500, title: 'ギザの大ピラミッド建設', color: 'pink' },
	{
		id: 'm3n4o5p6',
		start: -2500,
		end: -1500,
		title: 'メソポタミア：古バビロニア王国',
		color: 'gold'
	},
	{ id: 'q7r8s9t0', start: -2000, end: -1700, title: 'ミノア文明の最盛期', color: 'blue' },
	{ id: 'u1v2w3x4', start: -1700, end: -1500, title: 'ヒッタイト王国の成立', color: 'gold' },
	{ id: 'y5z6a7b8', start: -1600, end: -1100, title: '中国：殷王朝', color: 'gray' },
	{
		id: 'g3h4i5j6',
		start: -1200,
		end: -1000,
		title: 'トロイア戦争（伝説に基づく年代）',
		color: 'blue',
		subColor: 'red'
	},
	{ id: 'k7l8m9n0', start: -1100, end: -256, title: '中国：周王朝', color: 'gray' },
	{ id: 'o1p2q3r4', start: -1000, end: -500, title: '古代ギリシア：幾何学時代', color: 'blue' },
	{
		id: 's5t6u7v8',
		start: -900,
		end: -600,
		title: '古代オリエント：アッシリア帝国の最盛期',
		color: 'gold'
	},
	{ id: 'af1', start: 146, title: 'カルタゴ滅亡（北アフリカ）', color: 'pink' }, // 前回のデータから移動
	{ id: 'af2', start: 300, end: 1000, title: 'アクスム王国（エチオピア）の繁栄', color: 'pink' },
	{ id: 'af3', start: 400, end: 700, title: 'ガーナ王国の成立（西アフリカ）', color: 'pink' },
	{
		id: 'af4',
		start: 640,
		end: 700,
		title: 'イスラム勢力による北アフリカ征服',
		color: 'pink',
		subColor: 'red'
	},
	{ id: 'af5', start: 700, end: 1100, title: 'ヌビアのキリスト教王国の繁栄', color: 'pink' },
	{
		id: 'af6',
		start: 1000,
		end: 1500,
		title: 'サハラ交易の隆盛、マリ帝国、ソンガイ帝国の成立（西アフリカ）',
		color: 'pink'
	},
	{ id: 'af7', start: 1300, end: 1600, title: 'モノモタパ王国（ジンバブエ）の繁栄', color: 'pink' },
	{ id: 'af8', start: 1400, end: 1800, title: 'コンゴ王国の繁栄', color: 'pink' },
	{
		id: 'af9',
		start: 1415,
		title: 'ポルトガル人によるセウタ占領（北アフリカ）',
		color: 'pink',
		subColor: 'red'
	},
	{
		id: 'af10',
		start: 1500,
		end: 1900,
		title: '奴隷貿易の活発化',
		color: 'pink',
		subColor: 'black'
	}, // 人道的災害としてblack
	{
		id: 'af11',
		start: 1830,
		title: 'フランスによるアルジェリア侵略',
		color: 'pink',
		subColor: 'red'
	},
	{
		id: 'af12',
		start: 1884,
		end: 1885,
		title: 'ベルリン会議：アフリカ分割',
		color: 'pink',
		subColor: 'red'
	}, // 列強による分割も広義の戦争と捉える
	{ id: 'af13', start: 1910, title: '南アフリカ連邦成立', color: 'pink' },
	{
		id: 'af14',
		start: 1914,
		end: 1918,
		title: '第一次世界大戦：アフリカでも戦闘',
		color: 'pink',
		subColor: 'red'
	},
	{
		id: 'af15',
		start: 1935,
		end: 1941,
		title: '第二次イタリア・エチオピア戦争',
		color: 'pink',
		subColor: 'red'
	},
	{
		id: 'af16',
		start: 1939,
		end: 1945,
		title: '第二次世界大戦：アフリカ戦線',
		color: 'pink',
		subColor: 'red'
	},
	{ id: 'af17', start: 1950, end: 1970, title: 'アフリカの脱植民地化', color: 'pink' },
	{ id: 'af18', start: 1960, title: 'アフリカの年：多くのアフリカ諸国が独立', color: 'pink' },
	{ id: 'af19', start: 1994, title: 'ルワンダ虐殺', color: 'pink', subColor: 'red' },
	{
		id: 'af20',
		start: 2000,
		end: 2024,
		title: 'アフリカ連合（AU）の発足とアフリカの統合',
		color: 'pink'
	},
	{
		id: 'oc1',
		start: 100,
		end: 1600,
		title: 'ポリネシア人の大航海時代：ハワイ、ニュージーランド、イースター島などへの移住',
		color: 'brown'
	},
	{
		id: 'oc2',
		start: 300,
		end: 1200,
		title: 'メラネシア：ラピタ文化の衰退と地域ごとの文化の多様化',
		color: 'brown'
	},
	{
		id: 'oc3',
		start: 1000,
		end: 1600,
		title: 'ミクロネシア：ポンペイ島のナン・マトル遺跡の建設',
		color: 'brown'
	},
	{
		id: 'oc4',
		start: 1521,
		title: 'マゼランによるマリアナ諸島到達（ヨーロッパ人との最初の接触）',
		color: 'brown'
	},
	{
		id: 'oc5',
		start: 1770,
		title: 'キャプテン・クックによるオーストラリア東海岸の探検',
		color: 'brown'
	},
	{ id: 'oc6', start: 1788, title: 'イギリスによるオーストラリア植民地化の開始', color: 'brown' },
	{
		id: 'oc7',
		start: 1840,
		title: 'ワイタンギ条約：イギリスとマオリ族の間で締結（ニュージーランド）',
		color: 'brown'
	},
	{
		id: 'oc8',
		start: 1800,
		end: 1900,
		title: 'メラネシア・ミクロネシアでのヨーロッパ列強による植民地化',
		color: 'brown'
	},
	{ id: 'oc9', start: 1901, title: 'オーストラリア連邦成立', color: 'brown' },
	{
		id: 'oc10',
		start: 1914,
		end: 1918,
		title: '第一次世界大戦：オーストラリア・ニュージーランド軍が参戦（ガリポリの戦いなど）',
		color: 'brown',
		subColor: 'red'
	},
	{
		id: 'oc11',
		start: 1939,
		end: 1945,
		title: '第二次世界大戦：太平洋戦線、大洋州各地で激戦',
		color: 'brown',
		subColor: 'red'
	},
	{
		id: 'oc12',
		start: 1945,
		end: 1990,
		title: '太平洋諸島での核実験（アメリカ、フランス）',
		color: 'brown'
	},
	{ id: 'oc13', start: 1962, title: '西サモア独立', color: 'brown' },
	{ id: 'oc14', start: 1970, end: 1980, title: '多くの太平洋諸島が独立', color: 'brown' },
	{ id: 'oc15', start: 1985, title: 'ラロトンガ条約（南太平洋非核地帯条約）締結', color: 'brown' },
	{
		id: 'oc16',
		start: 2000,
		end: 2024,
		title: '気候変動による海面上昇が太平洋諸島に深刻な影響',
		color: 'brown'
	},
	{
		id: 'na1',
		start: 100,
		end: 700,
		title: 'テオティワカン文明の最盛期（メキシコ）',
		color: 'yellowgreen'
	},
	{
		id: 'na2',
		start: 200,
		end: 900,
		title: 'マヤ文明古典期の開始（メキシコ、中央アメリカ）',
		color: 'yellowgreen'
	},
	{ id: 'na3', start: 400, end: 800, title: 'モチェ文化の繁栄（ペルー）', color: 'yellowgreen' },
	{ id: 'na4', start: 500, end: 900, title: 'ナスカ文化の最盛期（ペルー）', color: 'yellowgreen' },
	{
		id: 'na5',
		start: 600,
		end: 900,
		title: '古典期マヤ文明の都市国家の隆盛',
		color: 'yellowgreen'
	},
	{ id: 'na6', start: 700, end: 1000, title: 'ティカルの繁栄（マヤ文明）', color: 'yellowgreen' },
	{
		id: 'na7',
		start: 800,
		end: 1000,
		title: 'ホープウェル文化の衰退とミシシッピ文化の始まり（北米）',
		color: 'green'
	},
	{
		id: 'na8',
		start: 900,
		end: 1200,
		title: 'トルテカ文明の繁栄（メキシコ）',
		color: 'yellowgreen'
	},
	{ id: 'na9', start: 1000, end: 1500, title: 'チムー王国（ペルー）', color: 'yellowgreen' },
	{
		id: 'na10',
		start: 1100,
		end: 1400,
		title: 'カホキアの繁栄（北米、ミシシッピ文化）',
		color: 'green'
	},
	{
		id: 'na11',
		start: 1200,
		end: 1500,
		title: 'アステカ帝国の成立（メキシコ）',
		color: 'yellowgreen'
	},
	{ id: 'na12', start: 1492, title: 'コロンブスのアメリカ大陸到達', color: 'yellowgreen' }, //ヨーロッパ人との接触開始
	{
		id: 'na15',
		start: 1607,
		title: 'ジェームズタウン植民地の建設（北米、イギリス）',
		color: 'green'
	},
	{ id: 'na16', start: 1608, title: 'ケベック植民地の建設（北米、フランス）', color: 'green' },
	{
		id: 'na17',
		start: 1775,
		end: 1783,
		title: 'アメリカ独立戦争',
		color: 'green',
		subColor: 'red'
	},
	{
		id: 'na18',
		start: 1810,
		end: 1825,
		title: 'ラテンアメリカ独立革命',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{ id: 'na19', start: 1846, end: 1848, title: '米墨戦争', color: 'green', subColor: 'red' },
	{
		id: 'na20',
		start: 1861,
		end: 1865,
		title: 'アメリカ南北戦争',
		color: 'green',
		subColor: 'red'
	},
	{
		id: 'na21',
		start: 1910,
		end: 1920,
		title: 'メキシコ革命',
		color: 'yellowgreen',
		subColor: 'red'
	},
	{
		id: 'na22',
		start: 2000,
		end: 2024,
		title: '北米自由貿易協定（NAFTA）発効（後にUSMCAへ）',
		color: 'green'
	},
	{ id: 'jp1', start: 794, title: '平安京遷都', color: 'purple' },
	{ id: 'jp2', start: 804, title: '最澄と空海が遣唐使として入唐', color: 'purple' },
	{ id: 'jp3', start: 806, title: '最澄が天台宗、空海が真言宗をそれぞれ開宗', color: 'purple' },
	{ id: 'jp4', start: 810, title: '薬子の変', color: 'purple', subColor: 'red' },
	{ id: 'jp5', start: 838, title: '最後の遣唐使派遣', color: 'purple' },
	{ id: 'jp6', start: 858, title: '藤原良房が人臣初の摂政に就任', color: 'purple' },
	{ id: 'jp7', start: 894, title: '遣唐使の正式廃止', color: 'purple' },
	{ id: 'jp8', start: 905, title: '『古今和歌集』が編纂される', color: 'purple' },
	{ id: 'jp9', start: 935, end: 941, title: '平将門の乱', color: 'purple', subColor: 'red' },
	{ id: 'jp10', start: 939, end: 941, title: '藤原純友の乱', color: 'purple', subColor: 'red' },
	{ id: 'jp11', start: 969, title: '安和の変', color: 'purple', subColor: 'red' },
	{ id: 'jp12', start: 995, title: '藤原道長が摂政に就任、摂関政治の最盛期', color: 'purple' },
	{ id: 'jp13', start: 1016, title: '藤原道長が太政大臣に就任', color: 'purple' },
	{ id: 'jp14', start: 1019, title: '刀伊の入寇', color: 'purple', subColor: 'red' },
	{ id: 'jp15', start: 1068, title: '後三条天皇が即位、摂関政治の衰退', color: 'purple' },
	{
		id: 'jp16',
		start: 1083,
		end: 1087,
		title: '後三条天皇による延久の荘園整理令',
		color: 'purple'
	},
	{ id: 'jp17', start: 1086, title: '白河上皇が院政を開始', color: 'purple' },
	{ id: 'jp18', start: 1096, end: 1100, title: '康和の大飢饉', color: 'purple', subColor: 'black' },
	{ id: 'jp19', start: 1107, title: '鳥羽天皇が即位', color: 'purple' },
	{ id: 'jp20', start: 1129, title: '白河上皇が崩御、院政の一時中断', color: 'purple' },
	{ id: 'jp21', start: 1156, title: '保元の乱', color: 'purple', subColor: 'red' },
	{ id: 'jp22', start: 1159, title: '平治の乱', color: 'purple', subColor: 'red' },
	{ id: 'jp23', start: 1180, end: 1185, title: '源平合戦', color: 'purple', subColor: 'red' },
	{ id: 'as14', start: -1600, end: -1046, title: '殷王朝', color: 'gray' },
	{ id: 'as15', start: -1046, end: -256, title: '周王朝', color: 'gray' },
	{ id: 'as16', start: -221, end: -206, title: '秦王朝：中国統一、始皇帝', color: 'gray' },
	{
		id: 'as17',
		start: -206,
		end: 220,
		title: '漢王朝：儒教の国教化、シルクロードの発展',
		color: 'gray'
	},
	{
		id: 'as18',
		start: 220,
		end: 589,
		title: '三国時代、西晋、東晋',
		color: 'gray',
		subColor: 'red'
	},
	{ id: 'as19', start: 581, end: 618, title: '隋王朝：大運河の建設', color: 'gray' },
	{ id: 'as20', start: 618, end: 907, title: '唐王朝：仏教の隆盛、文化の繁栄', color: 'gray' },
	{ id: 'as21', start: 960, end: 1279, title: '宋王朝：文治主義、経済の発展', color: 'gray' },
	{
		id: 'as22',
		start: 1271,
		end: 1368,
		title: '元王朝：モンゴル帝国の支配',
		color: 'gray',
		subColor: 'red'
	},
	{
		id: 'as23',
		start: 1368,
		end: 1644,
		title: '明王朝：大航海時代、鄭和の南海遠征',
		color: 'gray'
	},
	{ id: 'as24', start: 1644, end: 1912, title: '清王朝：中国最後の王朝', color: 'gray' },
	{ id: 'as25', start: 802, end: 1431, title: 'アンコール王朝（カンボジア）', color: 'gray' },
	{ id: 'as26', start: 1350, end: 1767, title: 'アユタヤ王朝（タイ）', color: 'gray' },
	{ id: 'as27', start: 668, end: 926, title: '渤海 (古代国家)', color: 'gray' },
	{ id: 'as28', start: 918, end: 1392, title: '高麗', color: 'gray' },
	{ id: 'as29', start: 1392, end: 1897, title: '李氏朝鮮', color: 'gray' },
	{ id: 'as30', start: 1526, end: 1857, title: 'ムガル帝国（インド）', color: 'gray' },
	{ id: 'as31', start: 1857, title: 'インド大反乱', color: 'gray', subColor: 'red' },
	{ id: 'as32', start: 1947, title: 'インド、パキスタン分離独立', color: 'gray' },
	{ id: 'as34', start: 1975, title: 'ベトナム戦争終結', color: 'gray', subColor: 'red' }
]
	.map((data) => ({ ...data, id: crypto.randomUUID() }))
	.reduce((acc, cur) => {
		if (!acc.find((data) => data.title === cur.title)) {
			acc.push(cur as Data);
		}
		return acc;
	}, [] as Data[]);
