export const contacts = [
  {
    name: 'DM 98',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [{ name: 'Tyler Boyd', id: '6047e683a83b208690f6c607' }],
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
