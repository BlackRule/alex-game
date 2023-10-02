import __html1 from 'src/html/1.html?raw'

export type SingleQ = { type: "single-q", correct: string };
export type MultiQ = { type: "multi-q", questions: { text: string, correct: string }[] };
export type SingleCh = { type: "single-ch", options: string[], correctId: number };
export type MultiCh = { type: "multi-ch", options: string[], correctIds: number[] };
export type Test = { text: string } & (SingleQ | MultiQ | SingleCh | MultiCh)
export type T3 = { type: "video", url: string, text: string } |
    { type: "test", tests: Test } |
    { type: "problem" };
export type T2 = { name: string, t3s: T3[] }
export type T1 = { name: string, t2s: T2[] }
export type TopicsForSubject = { [id: string]: T1[] }
export const topicsForSubject: TopicsForSubject = {
    'ch8': [{
        name:'Химическая формула и способы её определения',t2s:[{
            name: 'Химическая формула и что она означает',
            t3s: [
                {
                    type: 'video',
                    url: 'https://storage0.sirius.online/video/courses/RyykaKl3ttU.mp4',
                    text: __html1
                },
            ]
        },
            {
                name: 'Валентность. Составление формулы вещества по валентности',
                t3s: [
                    {
                        type: 'video',
                        url: 'https://storage0.sirius.online/video/courses/hHsN2BOBqGc.mp4',
                        text: __html1
                    },
                ]
            },
            {
                name: 'Относительная атомная и молекулярная массы',
                t3s: [
                    {
                        type: 'video',
                        url: 'https://storage0.sirius.online/video/courses/EHJld1ZCuGE.mp4',
                        text: __html1
                    },
                ]
            },
            {
                name: 'Массовая и атомная доли',
                t3s: [
                    {
                        type: 'video',
                        url: 'https://storage0.sirius.online/video/courses/_Cy0JTw1aL8.mp4',
                        text: __html1
                    },
                ]
            },
            {
                name: 'Расчет формулы вещества по массовым и атомным долям. Часть 1',
                t3s: [
                    {
                        type: 'video',
                        url: 'https://storage0.sirius.online/video/courses/QOLQVA2275k.mp4',
                        text: __html1
                    },
                ]
            },
            {
                name: 'Расчет формулы вещества по массовым и атомным долям. Часть 2',
                t3s: [
                    {
                        type: 'video',
                        url: 'https://storage0.sirius.online/video/courses/p_kRfVTeMzk.mp4',
                        text: __html1
                    },
                ]
            }]
    },
        {name: "Уравнения химических реакций", t2s: []},
        {name: "Смеси веществ", t2s: []},
        {name: "Строение и свойства газов", t2s: []},
        {name: "Ядро атома и радиоактивные превращения", t2s: []},
        {name: "Электронное строение атома", t2s: []},
        {name: "Химическая связь", t2s: []},
        {name: "Строение и свойства твердых веществ", t2s: []},
        {name: "Химия водорода", t2s: []},
        {name: "Химия кислорода", t2s: []},
        {name: "Основные классы неорганических веществ", t2s: []},
        {name: "Электролитическая диссоциация. Ионные реакции в растворах", t2s: []},
        {name: "Окислительно-восстановительные реакции", t2s: []}
    ],
    ch9: [{name: "Электролитическая диссоциация. Ионные реакции в растворах", t2s: []},
        {name: "Окислительно-восстановительные реакции", t2s: []},
        {name: "Химия щелочных металлов", t2s: []},
        {name: "Химия галогенов", t2s: []},
        {name: "Химия металлов 2-й группы", t2s: []},
        {name: "Химия благородных газов", t2s: []},
        {name: "Химия серы", t2s: []},
        {name: "Химия алюминия и бора", t2s: []},
        {name: "Химия фосфора", t2s: []},
        {name: " Химия азота", t2s: []},
        {name: "Химия кремния ", t2s: []},
        {name: "Химия углерода", t2s: []},
        {name: "Общие сведения о химии переходных металлов", t2s: []},
        {name: "Химия хрома и марганца ", t2s: []},
        {name: "Химия элементов триады железа", t2s: []},
        {name: "Химия элементов 11-й и 12-й групп", t2s: []}],
    ph8: [{name: "Прямолинейное распространение света", t2s: []},
        {name: "Отражение света от плоского зеркала", t2s: []},
        {name: "Построения в системе плоских зеркал", t2s: []},
        {name: "Изображения в системе плоских зеркал", t2s: []},
        {name: "Закон преломления света", t2s: []},
        {name: "Преломление света в неоднородных средах", t2s: []},
        {name: "Преломление света при малых углах падения", t2s: []},
        {name: "Построения в тонких линзах", t2s: []},
        {name: "Преломление света на сферической поверхности", t2s: []},
        {name: "Оптические системы", t2s: []},
        {name: "Оптические приборы", t2s: []}]
}