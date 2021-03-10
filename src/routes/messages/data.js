export const contacts = [
  {
    name: 'DM 98',
    id: id(),
    subgroups: [
      {
        name: 'Kansas CO',
        id: id(),
        contacts: [
          { name: 'Jane Cooper', id: id() },
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
        contacts: [{ name: 'Ronald Richards', id: id() }],
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
