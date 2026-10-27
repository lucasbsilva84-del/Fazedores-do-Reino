// Preencha somente com informações e mídias confirmadas pela igreja.
export const church = {
  name: 'Fazedores do Reino', city: 'Caxias do Sul',
  address: '', mapsUrl: '', email: '', whatsapp: '',
  serviceTimes: [], leaders: [], events: [], cells: [],
  contactEndpoint: '',
  logo: '/media/logo.png',
  cover: '', // Foto oficial de capa. Enquanto vazia, usa composição gráfica com a logo.
  videos: [
    { src: '', file: '/media/abertura-1.mp4', position: '50% 50%', mobilePosition: '50% 50%', reference: 'https://www.instagram.com/reel/De8G6lrRhBD/' },
    { src: '', file: '/media/abertura-2.mp4', position: '50% 50%', mobilePosition: '50% 50%', reference: 'https://www.instagram.com/reel/DK8LurRRzG9/' },
  ], // Após copiar os MP4, preencha src com o valor de file.
  photos: { church: '', community: '', worship: '', welcome: '', events: '' },
  gallery: [], // { src, alt, caption }; liderança: { name, role, photo, bio }
  panorama: '', // Reservado a panorama equiretangular 2:1 real; viewer ainda não integrado.
};
