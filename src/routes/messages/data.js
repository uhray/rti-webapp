export const contacts = [
  {
    name: 'DM 98',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          {
            name: 'Papa Giorgio',
            id: '6047e683a83b208690f6c607',
            picture:
              'https://cdnb.artstation.com/p/assets/images/images/028/800/351/large/wyatt-belgard-cthulhuavatar-nobackground.jpg?1595539181',
          },
          {
            name: 'Mattimus Prime',
            id: '6011a9cd2e0b8646085654e5',
            picture:
              'https://reflector.tfw2005.com/wp-content/uploads/sites/14/2011/05/head-closeup-jpg.jpg',
          },
          {
            name: 'Swamp Brett',
            id: '604be0231aec19a4c1d8becf',
            picture:
              'https://pm1.narvii.com/7603/7a2ea6024d14bd7ceea75da6b906076e2fb7841dr1-828-481v2_128.jpg',
          },
        ],
      },
    ],
  },
];

export const contacts2 = [
  {
    name: 'DM 98',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: '1' },
          { name: 'Ralph Edwards', id: id() },
        ],
      },
      {
        name: 'Kansas LP',
        id: id(),
        contacts: [
          { name: 'Annette Black', id: id() },
          { name: 'Albert Flores', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Brooklyn Simmons', id: id() },
        ],
      },
      {
        name: 'Kansas OO',
        id: id(),
        contacts: [{ name: 'Ronald Richardspatternsonspliggity', id: id() }],
      },
    ],
  },
  {
    name: 'DM 99',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Ralph Edwards', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
        ],
      },
      {
        name: 'Kansas LP',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Annette Black', id: id() },
          { name: 'Albert Flores', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Brooklyn Simmons', id: id() },
          { name: 'Ralph Edwards', id: id() },
        ],
      },
      {
        name: 'Kansas OO',
        id: id(),
        contacts: [{ name: 'Ronald Richardspatternsonspliggity', id: id() }],
      },
    ],
  },
  {
    name: 'DM 100',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Ralph Edwards', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
        ],
      },
      {
        name: 'Kansas LP',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Annette Black', id: id() },
          { name: 'Albert Flores', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Brooklyn Simmons', id: id() },
          { name: 'Ralph Edwards', id: id() },
        ],
      },
      {
        name: 'Kansas OO',
        id: id(),
        contacts: [{ name: 'Ronald Richardspatternsonspliggity', id: id() }],
      },
    ],
  },
  {
    name: 'DM 101',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Ralph Edwards', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
        ],
      },
      {
        name: 'Kansas LP',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Annette Black', id: id() },
          { name: 'Albert Flores', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Brooklyn Simmons', id: id() },
          { name: 'Ralph Edwards', id: id() },
        ],
      },
      {
        name: 'Kansas OO',
        id: id(),
        contacts: [{ name: 'Ronald Richardspatternsonspliggity', id: id() }],
      },
    ],
  },
  {
    name: 'DM 102',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Ralph Edwards', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Esther Howard', id: id() },
        ],
      },
      {
        name: 'Kansas LP',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
          { name: 'Annette Black', id: id() },
          { name: 'Albert Flores', id: id() },
          { name: 'Esther Howard', id: id() },
          { name: 'Brooklyn Simmons', id: id() },
          { name: 'Ralph Edwards', id: id() },
        ],
      },
      {
        name: 'Kansas OO',
        id: id(),
        contacts: [{ name: 'Ronald Richardspatternsonspliggity', id: id() }],
      },
    ],
  },
];

function id() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
