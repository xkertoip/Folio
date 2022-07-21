const preview = require('/images/pesrpsective.jpeg');
const preview1 = require('/images/code.jpg');
const preview2 = require('/images/home_background.jpg');

export const projectsData: {id: number; name: string; slug: string; src: string; technology: string; href:string; adds: string[]; info: string}[] = [
    {
        id: 6,
        name: 'Allex',
        slug: 'Allex',
        src: preview,
        technology: 'Angular',
        href: '/about',
        adds: ['Angular', 'SCSS'],
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: 5,
        name: 'AmnisCode',
        slug: 'AmnisCode',
        src: preview1,
        href: '/about',
        technology: 'React',
        adds: ['React', 'Styled Components', 'hooks'],
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: 4,
        name: 'AmnisCode Blog',
        slug: 'AmnisCode Blog',
        src: preview2,
        href: '/about',
        technology: 'Wordpress',
        adds: ['Css'],
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: 3,
        name: 'Szkoła Kasinka SP2',
        slug: 'Szkoła Kasinka SP2',
        src: preview,
        href: '/about',
        technology: 'Wordpress',
        adds: ['Css'],
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: 2,
        name: 'Bierowiec',
        slug: 'Bierowiec',
        src: preview,
        href: '/about',
        technology: 'React',
        adds: ['Gatsby', 'React', 'Styled Components', 'Hooks'],
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: 1,
        name: 'Portfolio',
        slug: 'Portfolio',
        src: preview,
        href: '/about',
        technology: 'React',
        adds: ['Gatsby', 'React', 'Styled Components', 'Hooks'],
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    }
];
