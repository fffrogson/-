import React, { useState, useMemo } from 'react';
import {
  Beaker,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Award,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Search,
  Layers,
  Info,
  Sparkles,
  BookMarked,
} from 'lucide-react';

// ==================== 数据定义 (增强版，增加复盐与多样化实例) ====================

const CHEMISTRY_DATA = {
  acid: {
    id: 'acid',
    title: '酸 (Acids)',
    formula: 'H⁺',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-500/30',
    lightBg: 'bg-rose-500/10',
    textColor: 'text-rose-400',
    definition: '在水溶液中电离出的阳离子全部是氢离子 (H⁺) 的化合物。',
    classifications: [
      {
        name: '按是否含氧分类',
        items: [
          {
            label: '含氧酸',
            desc: '分子中含有氧原子',
            examples:
              'H₂SO₄ (硫酸 - 工业之母), HNO₃ (硝酸), H₂CO₃ (碳酸 - 汽水成分), H₃PO₄ (磷酸), HClO₄ (高氯酸 - 极强酸)',
          },
          {
            label: '无氧酸',
            desc: '分子中不含氧原子',
            examples:
              'HCl (盐酸/氢氯酸 - 胃酸成分), HF (氢氟酸 - 可雕刻玻璃), H₂S (氢硫酸 - 臭鸡蛋气味), HCN (氢氰酸 - 剧毒)',
          },
        ],
      },
      {
        name: '按电离出的 H⁺ 个数分类',
        items: [
          {
            label: '一元酸',
            desc: '电离产生1个 H⁺',
            examples:
              'HCl, HNO₃, CH₃COOH, HBr (氢溴酸), Formic Acid (HCOOH - 蚁酸)',
          },
          {
            label: '二元酸',
            desc: '电离产生2个 H⁺',
            examples: 'H₂SO₄, H₂CO₃, H₂S, H₂C₂O₄ (草酸 - 拔除铁锈)',
          },
          {
            label: '多元酸',
            desc: '电离产生多个 H⁺',
            examples: 'H₃PO₄ (磷酸 - 三元酸), H₃BO₃ (硼酸 - 弱中强三元)',
          },
        ],
      },
      {
        name: '按酸性强弱分类',
        items: [
          {
            label: '强酸',
            desc: '在水中完全电离',
            examples: 'HCl, H₂SO₄, HNO₃, HI (氢碘酸), HBr, HClO₄',
          },
          {
            label: '弱酸',
            desc: '在水中部分电离',
            examples: 'CH₃COOH (醋酸), H₂CO₃, HF, H₂S, H₂SO₃ (亚硫酸)',
          },
        ],
      },
    ],
    traps: [
      {
        title: '醋酸 (CH₃COOH) 是一元酸的奥秘',
        content:
          '别看醋酸分子中含有 4 个氢原子，但在水中只有末尾羧基上的 H⁺ 能够发生电离。其电离方程式为：CH₃COOH ⇌ CH₃COO⁻ + H⁺。',
      },
      {
        title: '硫酸氢钠 (NaHSO₄) 的“酸性”伪装',
        content:
          'NaHSO₄ 在水中能电离出 H⁺，但由于同时电离出了金属阳离子 Na⁺，使得其阳离子“不完全是”氢离子。因此，它在分类上属于酸式盐，而不是酸。',
      },
    ],
  },
  base: {
    id: 'base',
    title: '碱 (Bases)',
    formula: 'OH⁻',
    color: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-500/30',
    lightBg: 'bg-sky-500/10',
    textColor: 'text-sky-400',
    definition: '在水溶液中电离出的阴离子全部是氢氧根离子 (OH⁻) 的化合物。',
    classifications: [
      {
        name: '按溶解性分类（最常用）',
        items: [
          {
            label: '可溶性碱',
            desc: '易溶于水，完全电离',
            examples:
              'NaOH (烧碱/火碱), KOH (氢氧化钾 - 电池电解液), Ba(OH)₂ (氢氧化钡), NH₃·H₂O (一水合氨/氨水)',
          },
          {
            label: '微溶性碱',
            desc: '微溶于水',
            examples:
              'Ca(OH)₂ (熟石灰/消石灰 - 建筑材料，澄清石灰水成分), Mg(OH)₂ (氢氧化镁 - 胃抗酸药，溶解度介于微溶难溶之间)',
          },
          {
            label: '难溶性碱',
            desc: '几乎不溶于水，呈沉淀',
            examples:
              'Fe(OH)₃ (红褐色沉淀), Cu(OH)₂ (蓝色沉淀), Al(OH)₃ (白色胶状沉淀 - 净水剂), Fe(OH)₂ (白色沉淀，易被氧化)',
          },
        ],
      },
      {
        name: '按碱性强弱分类',
        items: [
          {
            label: '强碱',
            desc: '在水中完全电离',
            examples: 'NaOH, KOH, Ba(OH)₂, Ca(OH)₂ (在中考/高考中通常视作强碱)',
          },
          {
            label: '弱碱',
            desc: '在水中部分电离',
            examples: 'NH₃·H₂O, Fe(OH)₃, Cu(OH)₂, Al(OH)₃',
          },
        ],
      },
    ],
    traps: [
      {
        title: '纯碱 (Na₂CO₃) 绝对不是碱',
        content:
          '碳酸钠俗称“纯碱”或“苏打”，其水溶液由于水解作用显碱性。但它电离出的阳离子是金属离子 Na⁺，阴离子是酸根离子 CO₃²⁻，在分子结构上是不折不扣的“盐”。',
      },
      {
        title: '难溶性碱对指示剂的“冷漠”',
        content:
          '酸碱指示剂（如酚酞、石蕊）的变色需要游离的 H⁺ 或 OH⁻ 离子。难溶性碱（如 Cu(OH)₂、Fe(OH)₃）在水中几乎不电离，因此无法使酚酞变红，也无法使石蕊变蓝。',
      },
    ],
  },
  salt: {
    id: 'salt',
    title: '盐 (Salts)',
    formula: 'M⁺ + A⁻',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    lightBg: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    definition: '电离时生成金属离子（或铵根离子 NH₄⁺）与酸根离子的化合物。',
    classifications: [
      {
        name: '按组成成分精细分类（新增复盐）',
        items: [
          {
            label: '正盐',
            desc: '既不含能电离的氢原子，也不含氢氧根',
            examples:
              'NaCl (食盐), Na₂CO₃ (碳酸钠), K₂SO₄ (硫酸钾), BaSO₄ (医疗用钡餐), KMnO₄ (高锰酸钾 - 消毒剂)',
          },
          {
            label: '酸式盐',
            desc: '含有能电离的氢原子',
            examples:
              'NaHCO₃ (碳酸氢钠 - 小苏打), NaHSO₄ (硫酸氢钠), Ca(HCO₃)₂ (碳酸氢钙 - 硬水成分), NaH₂PO₄ (磷酸二氢钠)',
          },
          {
            label: '碱式盐',
            desc: '含有氢氧根的盐',
            examples:
              'Cu₂(OH)₂CO₃ (碱式碳酸铜 - 铜绿), Mg(OH)Cl (碱式氯化镁), BiOCl (次氯化铋)',
          },
          {
            label: '复盐 (新增)',
            desc: '由两种或两种以上的金属阳离子（或铵根离子）和一种酸根离子构成的盐',
            examples:
              'KAl(SO₄)₂·12H₂O (明矾 - 常用净水剂), (NH₄)₂Fe(SO₄)₂·6H₂O (莫尔盐 - 实验室标准物质)',
          },
        ],
      },
      {
        name: '按溶解性分类',
        items: [
          {
            label: '可溶性盐',
            desc: '钾、钠、铵、硝酸盐全部可溶',
            examples: 'KNO₃, NH₄Cl, CH₃COONa (醋酸钠), BaCl₂',
          },
          {
            label: '难溶性盐',
            desc: '在水中溶解度极小，生成沉淀',
            examples:
              'AgCl (氯化银↓), BaSO₄ (硫酸钡↓), CaCO₃ (碳酸钙↓), BaCO₃↓, AgBr (溴化银↓ - 照相感光旧料)',
          },
        ],
      },
    ],
    traps: [
      {
        title: '复盐不是混盐，更不是混合物',
        content:
          '复盐（如明矾）含有固定的化学式和晶格结构，它属于纯净物中的化合物。当它溶解在水中时，会完全电离成两种不同的金属阳离子和酸根离子，与普通的单一盐电离不同。',
      },
      {
        title: '铵盐：不含金属元素的特例',
        content:
          '如氯化铵 (NH₄Cl) 和硝酸铵 (NH₄NO₃)。它们由非金属元素（N、H、Cl、O等）构成，不含任何金属元素。但由于 NH₄⁺ 具有类似金属离子的化学行为，所以它们均属于“盐”。',
      },
      {
        title: '酸式盐不一定呈酸性',
        content:
          '酸式盐在水中的酸碱性由“电离”与“水解”两种趋势竞争决定。例如碳酸氢钠 (NaHCO₃) 电离产生 HCO₃⁻，但其水解程度强于电离，溶液反而呈碱性；而 NaHSO₄ 电离出的 H⁺ 极强，溶液呈强酸性。',
      },
    ],
  },
  oxide: {
    id: 'oxide',
    title: '氧化物 (Oxides)',
    formula: 'X_xO_y',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    lightBg: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    definition: '由两种元素组成，其中一种元素是氧元素的化合物。',
    classifications: [
      {
        name: '按化学性质分类（最核心）',
        items: [
          {
            label: '酸性氧化物',
            desc: '与碱反应生成盐和水的氧化物',
            examples:
              'CO₂ (二氧化碳), SO₂ (二氧化硫 - 酸雨主因), SO₃ (三氧化硫), P₂O₅ (五氧化二磷), Mn₂O₇ (七氧化二锰 - 极少数金属酸性氧化物)',
          },
          {
            label: '碱性氧化物',
            desc: '与酸反应生成盐和水的氧化物',
            examples:
              'CaO (氧化钙 - 生石灰), Fe₂O₃ (氧化铁 - 铁锈主成分), CuO (氧化铜 - 黑色固体), Na₂O (氧化钠)',
          },
          {
            label: '两性氧化物',
            desc: '既能与酸反应又能与碱反应',
            examples: 'Al₂O₃ (氧化铝 - 蓝宝石主成分), ZnO (氧化锌)',
          },
          {
            label: '不成盐氧化物',
            desc: '不能与酸或碱反应生成盐和水',
            examples:
              'CO (一氧化碳 - 有毒气体), NO (一氧化氮), H₂O (水 - 极为特殊的非金属氧化物), N₂O (一氧化二氮 - 笑气)',
          },
        ],
      },
      {
        name: '按组成元素分类',
        items: [
          {
            label: '金属氧化物',
            desc: '阳性元素为金属',
            examples: 'CuO, Fe₂O₃, Al₂O₃, CaO, Na₂O₂, Mn₂O₇',
          },
          {
            label: '非金属氧化物',
            desc: '阳性元素为非金属',
            examples: 'H₂O, CO₂, CO, SO₂, P₂O₅',
          },
        ],
      },
    ],
    traps: [
      {
        title: '酸性氧化物 ≠ 非金属氧化物',
        content:
          '不能单纯以元素种类来下结论。① 一氧化碳 (CO) 是非金属氧化物，但它属于“不成盐氧化物”。② 七氧化二锰 (Mn₂O₇) 对应高锰酸，它是金属氧化物，但却是不折不扣的“酸性氧化物”。',
      },
      {
        title: '碱性氧化物 ≠ 金属氧化物',
        content:
          '氧化铝 (Al₂O₃) 虽然是金属氧化物，但它可以和强碱（如 NaOH）及强酸反应生成对应的铝盐和水，分类上属于“两性氧化物”。所以碱性氧化物一定是金属氧化物，但金属氧化物不一定是碱性氧化物。',
      },
    ],
  },
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '明矾 [KAl(SO₄)₂·12H₂O] 属于下列哪一种盐的精细分类？',
    options: [
      { key: 'A', text: '酸式盐，因为里面有氢氧根和水结晶' },
      { key: 'B', text: '混盐，属于混合物' },
      {
        key: 'C',
        text: '复盐，因为它是由钾离子、铝离子两种金属阳离子和一种酸根离子构成的纯净物',
      },
    ],
    correct: 'C',
    explanation:
      '明矾含有两种不同的金属阳离子（K⁺和Al³⁺）和一种酸根离子（SO₄²⁻），属于典型的复盐，复盐是纯净物。',
  },
  {
    id: 2,
    question:
      '七氧化二锰 (Mn₂O₇) 是一种金属氧化物，它在化学性质上属于什么氧化物？',
    options: [
      { key: 'A', text: '碱性氧化物，因为所有金属氧化物都是碱性氧化物' },
      {
        key: 'B',
        text: '酸性氧化物，因为它可以与水反应生成高锰酸 (HMnO₄)，与碱反应生成高锰酸盐和水',
      },
      { key: 'C', text: '不成盐氧化物' },
    ],
    correct: 'B',
    explanation:
      '这是著名的分类陷阱！Mn₂O₇ 是金属氧化物，但它对应的水化物是强酸 HMnO₄，能与碱反应生成盐和水，因此它是酸性氧化物。',
  },
  {
    id: 3,
    question: '硫酸氢钠 (NaHSO₄) 在水溶液中可以电离出 H⁺，它属于‘酸’吗？',
    options: [
      { key: 'A', text: '属于酸，因为凡是能电离出 H⁺ 的物质都是酸' },
      {
        key: 'B',
        text: '不属于酸，属于盐。因为它电离出的阳离子除 H⁺ 外还有金属 Na⁺，不满足“全部是 H⁺”的定义',
      },
      { key: 'C', text: '不属于酸，属于氧化物，因为含有氧原子' },
    ],
    correct: 'B',
    explanation:
      '酸的定义是“电离出的阳离子全部是氢离子”。NaHSO₄ 还会电离出 Na⁺，因此它属于酸式盐而非酸。',
  },
  {
    id: 4,
    question: '关于俗称为“纯碱”的碳酸钠 (Na₂CO₃)，以下说法正确的是：',
    options: [
      { key: 'A', text: '它是碱，因为它的名字叫纯碱且水溶液显碱性' },
      {
        key: 'B',
        text: '它是盐，因为它是金属阳离子 Na⁺ 和酸根离子 CO₃²⁻ 构成的正盐',
      },
      { key: 'C', text: '它是碱性氧化物，因为它是由钠和碳、氧结合的' },
    ],
    correct: 'B',
    explanation:
      '俗名有误导性。虽然 Na₂CO₃ 水溶液呈碱性（常被称作纯碱），但根据其电离产生的阳离子（Na⁺）与阴离子（CO₃²⁻），其本质是正盐。',
  },
];

// ==================== 氧化物包含关系 Venn 图组件 ====================

function OxideVennDiagram() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
        <h4 className="text-sm font-extrabold text-slate-200">
          氧化物包含关系可视化图谱 (Venn Diagram)
        </h4>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        下图直观展现了**组成元素分类法**（金属/非金属）与**化学性质分类法**（酸性/碱性/两性/不成盐）之间的纵横交错包含关系。请注意跨界物质（如两性氧化物与金属酸性氧化物）。
      </p>

      {/* Venn 结构模拟容器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
        {/* 左翼：金属氧化物域 */}
        <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-4 flex flex-col gap-3 relative">
          <div className="absolute top-2 left-3 text-[10px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
            金属氧化物 (元素视角)
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {/* 碱性氧化物区 */}
            <div className="bg-slate-900 border border-emerald-500/20 p-2.5 rounded-lg">
              <span className="text-xs font-bold text-emerald-400 block">
                ✦ 碱性氧化物 (绝大多数在此)
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                与酸反应生盐水。例如：
                <span className="font-mono text-slate-300">
                  CaO, Fe₂O₃, CuO, Na₂O
                </span>
              </p>
            </div>

            {/* 两性氧化物交界 */}
            <div className="bg-slate-900 border border-purple-500/30 p-2.5 rounded-lg bg-gradient-to-r from-purple-950/20 to-slate-900">
              <span className="text-xs font-bold text-purple-400 block">
                ✦ 两性氧化物 (全员属于金属氧化物)
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                既能与强酸又能与强碱反应。例如：
                <span className="font-mono text-slate-300">Al₂O₃, ZnO</span>
              </p>
            </div>

            {/* 特例：金属中的酸性氧化物 */}
            <div className="bg-slate-900 border border-rose-500/40 p-2.5 rounded-lg">
              <span className="text-xs font-bold text-rose-400 block">
                ⚠️ 特例：酸性氧化物 (高价态金属)
              </span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                <span className="font-mono text-rose-300 font-bold">Mn₂O₇</span>{' '}
                (七氧化二锰) 虽是金属氧化物，但它是酸性氧化物！
              </p>
            </div>
          </div>
        </div>

        {/* 右翼：非金属氧化物域 */}
        <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-4 flex flex-col gap-3 relative">
          <div className="absolute top-2 left-3 text-[10px] font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800/60">
            非金属氧化物 (元素视角)
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {/* 酸性氧化物区 */}
            <div className="bg-slate-900 border border-rose-500/20 p-2.5 rounded-lg">
              <span className="text-xs font-bold text-rose-400 block">
                ✦ 酸性氧化物 (绝大多数在此)
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                与碱反应生盐水。例如：
                <span className="font-mono text-slate-300">
                  CO₂, SO₂, SO₃, P₂O₅
                </span>
              </p>
            </div>

            {/* 不成盐氧化物区 */}
            <div className="bg-slate-900 border border-amber-500/30 p-2.5 rounded-lg">
              <span className="text-xs font-bold text-amber-400 block">
                ✦ 不成盐氧化物 (全员属于非金属氧化物)
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                不与酸/碱反应生成盐水。例如：
                <span className="font-mono text-slate-300">CO, NO, N₂O</span>
              </p>
            </div>

            {/* 特殊物质 水 */}
            <div className="bg-slate-900 border border-sky-500/30 p-2 rounded-lg text-[11px] text-slate-400">
              <strong className="text-sky-400">H₂O (水)</strong>{' '}
              是非金属氧化物，但在分类上极其特殊，通常归为极弱的不成盐或两性特例。
            </div>
          </div>
        </div>
      </div>

      {/* 核心结论摘要 */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1">
        <div>
          •{' '}
          <strong className="text-slate-200">碱性氧化物一定是金属氧化物</strong>
          ，但金属氧化物不一定是碱性氧化物（如{' '}
          <span className="text-purple-400">Al₂O₃</span> 是两性，
          <span className="text-rose-400">Mn₂O₇</span> 是酸性）。
        </div>
        <div>
          •{' '}
          <strong className="text-slate-200">酸性氧化物多为非金属氧化物</strong>
          ，但存在金属氧化物特例（如{' '}
          <span className="text-rose-400">Mn₂O₇</span>
          ）；非金属氧化物也不一定是酸性氧化物（如{' '}
          <span className="text-amber-400">CO, NO</span> 是不成盐氧化物）。
        </div>
      </div>
    </div>
  );
}

// ==================== 主应用组件 ====================

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedCategory, setSelectedCategory] = useState('acid');
  const [searchQuery, setSearchQuery] = useState('');

  // 答题系统状态
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // 节点展开折叠状态
  const [expandedNodes, setExpandedNodes] = useState({
    root: true,
    acid: true,
    base: true,
    salt: true,
    oxide: true,
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const toggleAllNodes = (expand) => {
    setExpandedNodes({
      root: expand,
      acid: expand,
      base: expand,
      salt: expand,
      oxide: expand,
    });
  };

  // 搜索过滤
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CHEMISTRY_DATA;
    const query = searchQuery.toLowerCase();
    const result = {};
    Object.entries(CHEMISTRY_DATA).forEach(([key, value]) => {
      const matchTitle = value.title.toLowerCase().includes(query);
      const matchDef = value.definition.toLowerCase().includes(query);
      const matchClass = value.classifications.some(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.items.some(
            (i) =>
              i.label.toLowerCase().includes(query) ||
              i.desc.toLowerCase().includes(query) ||
              i.examples.toLowerCase().includes(query)
          )
      );
      const matchTrap = value.traps.some(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.content.toLowerCase().includes(query)
      );

      if (matchTitle || matchDef || matchClass || matchTrap) {
        result[key] = value;
      }
    });
    return result;
  }, [searchQuery]);

  // 处理测验答题
  const handleSelectOption = (qId, optionKey) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const submitQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 顶部导航 */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-xl text-slate-950 shadow-lg shadow-cyan-500/10">
              <Beaker className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                无机化合物分类智能导航系统
              </h1>
              <p className="text-xs text-slate-400">
                升级版：包含复盐精细细分 & 氧化物交叉关系图谱
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                activeTab === 'map'
                  ? 'bg-slate-800 text-cyan-400 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              智能导图
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                activeTab === 'quiz'
                  ? 'bg-slate-800 text-emerald-400 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              高频刷题自测
            </button>
          </div>
        </div>
      </header>

      {/* 搜索过滤栏 */}
      <section className="bg-slate-900/40 border-b border-slate-800/60 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="输入如: 明矾, Mn₂O₇, 复盐, 碱式盐..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-cyan-500/80 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all"
            />
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 导图左侧 - 节点树 */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                  <h2 className="text-lg font-bold">无机化学结构大图景</h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <button
                    onClick={() => toggleAllNodes(true)}
                    className="hover:text-cyan-400"
                  >
                    展开全部
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => toggleAllNodes(false)}
                    className="hover:text-cyan-400"
                  >
                    折叠全部
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur">
                <div className="absolute left-10 top-16 bottom-16 w-0.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 pointer-events-none"></div>

                {/* 根节点 */}
                <div className="relative z-10">
                  <div
                    onClick={() => toggleNode('root')}
                    className="inline-flex items-center gap-3 bg-slate-800/90 border border-slate-700/60 px-4 py-2.5 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-md group"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 text-slate-950">
                      <Beaker className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                        无机化合物
                      </span>
                    </div>
                    {expandedNodes.root ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {/* 子大类分支 */}
                  {expandedNodes.root && (
                    <div className="ml-8 mt-4 pl-4 border-l border-slate-800 flex flex-col gap-4">
                      {Object.entries(filteredCategories).map(([key, cat]) => {
                        const isSelected = selectedCategory === key;
                        return (
                          <div
                            key={key}
                            className="relative flex flex-col gap-2"
                          >
                            <div className="absolute -left-4 top-5 w-4 h-0.5 bg-slate-800"></div>

                            <div
                              onClick={() => {
                                setSelectedCategory(key);
                                toggleNode(key);
                              }}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 w-full border ${
                                isSelected
                                  ? `bg-slate-800 border-l-4 ${cat.borderColor} shadow-md`
                                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                              }`}
                            >
                              <span
                                className={`text-xs px-2 py-0.5 rounded font-bold bg-gradient-to-br ${cat.color} text-slate-950`}
                              >
                                {cat.formula}
                              </span>
                              <div className="flex-1">
                                <h3
                                  className={`text-sm font-semibold ${
                                    isSelected
                                      ? cat.textColor
                                      : 'text-slate-200'
                                  }`}
                                >
                                  {cat.title}
                                </h3>
                              </div>
                              {expandedNodes[key] ? (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-500" />
                              )}
                            </div>

                            {/* 节点展开 */}
                            {expandedNodes[key] && (
                              <div className="ml-6 pl-4 border-l border-slate-800/80 mt-2 flex flex-col gap-2">
                                {cat.classifications.map((cls, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="text-xs bg-slate-900/40 border border-slate-800/50 rounded-lg p-2.5"
                                  >
                                    <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5 text-cyan-400">
                                      {cls.name}
                                    </div>
                                    <div className="flex flex-col gap-2 pl-2">
                                      {cls.items.map((item, iIdx) => (
                                        <div
                                          key={iIdx}
                                          className="border-b border-slate-800/30 last:border-0 pb-1.5 last:pb-0"
                                        >
                                          <strong className="text-slate-200">
                                            {item.label}
                                          </strong>
                                          :{' '}
                                          <span className="text-slate-400">
                                            {item.desc}
                                          </span>
                                          <span className="text-[11px] text-amber-400/90 block italic font-mono mt-0.5">
                                            {item.examples}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 当选中氧化物时，在下方联袂展出 Venn 关系图图谱 */}
              {selectedCategory === 'oxide' && <OxideVennDiagram />}
            </div>

            {/* 导图右侧 - 节点深度解析 */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold">深度解析面板</h2>
              </div>

              {selectedCategory &&
                CHEMISTRY_DATA[selectedCategory] &&
                (() => {
                  const activeCat = CHEMISTRY_DATA[selectedCategory];
                  return (
                    <div className="flex flex-col gap-4">
                      <div
                        className={`bg-gradient-to-br ${activeCat.color} p-5 rounded-2xl text-slate-950 shadow-md`}
                      >
                        <h3 className="text-xl font-black">
                          {activeCat.title}
                        </h3>
                        <p className="text-xs font-bold text-slate-900/70 mt-2">
                          权威统一定义：
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          {activeCat.definition}
                        </p>
                      </div>

                      {/* 易错防御区 */}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-amber-500 mb-3 font-extrabold text-xs tracking-wider">
                          <AlertTriangle className="w-4 h-4" />
                          <span>极易扣分/高频误导陷阱</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          {activeCat.traps.map((trap, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-950/70 border border-amber-500/10 rounded-xl p-3"
                            >
                              <div className="text-xs font-bold text-amber-400 mb-1">
                                {trap.title}
                              </div>
                              <p className="text-[11px] text-slate-300 leading-relaxed">
                                {trap.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        )}

        {/* 刷题自测面板 */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold">
                  化学陷阱通关测试（加强版）
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  专门测验复盐、高价态金属氧化物等刁钻分类题。
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300"
              >
                重置
              </button>
            </div>

            {quizSubmitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center text-sm font-bold text-emerald-400">
                测验完成！得分: {quizScore} / {QUIZ_QUESTIONS.length}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const selectedOpt = quizAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-3"
                  >
                    <div className="text-xs font-bold text-cyan-400">
                      第 {idx + 1} 题
                    </div>
                    <div className="text-sm font-bold">{q.question}</div>
                    <div className="flex flex-col gap-2 mt-1">
                      {q.options.map((opt) => (
                        <button
                          key={opt.key}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(q.id, opt.key)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                            selectedOpt === opt.key
                              ? 'border-cyan-500 bg-cyan-500/5'
                              : 'border-slate-800 bg-slate-950/40'
                          } ${
                            quizSubmitted && opt.key === q.correct
                              ? 'border-emerald-500 bg-emerald-500/10'
                              : ''
                          }`}
                        >
                          {opt.key}. {opt.text}
                        </button>
                      ))}
                    </div>
                    {quizSubmitted && (
                      <div className="bg-slate-950 p-3 rounded-lg text-[11px] text-slate-400 mt-2 border-l-2 border-cyan-500">
                        <span className="font-bold text-slate-200">解析：</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && (
              <button
                onClick={submitQuiz}
                disabled={
                  Object.keys(quizAnswers).length !== QUIZ_QUESTIONS.length
                }
                className="w-full bg-cyan-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                提交答卷
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
