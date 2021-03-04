export const data = {
  type: 'orders',
  data: [
    {
      id: '0102031',
      orderDate: 'Jan 23, 2020',
      status: 'pending',
      vehicle: '1XY001',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Seattle, WA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'BILL_OF_LADING',
            size: '213 KB',
            location: 'COOCAR',
            uploaded_at: 'Jan 12 2021 8:00am',
          },
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
          {
            filename: 'MEGA SUPER ULTRA DOCUMENT',
            size: '163645631 TB',
            location: 'Beginning of the Universe',
            uploaded_at: '∞',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'completed',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'declined',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'dispatched',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
    {
      id: '0102032',
      orderDate: 'Jan 24, 2020',
      status: 'in progress',
      vehicle: '1XY123',
      startPoint: 'Seattle, WA 02476',
      endPoint: 'Atlanta, GA 01652',
      totalMiles: 1013,
      estWeight: 9001,
      documents: {
        data: [
          {
            filename: 'SUPER DOCUMENT',
            size: '91324 TB',
            location: 'RANDOM',
            uploaded_at: 'Jan 1 2021 8:00am',
          },
        ],
      },
    },
  ],
};

export const headers = [
  { header: 'order', text: 'Order' },
  { header: 'status', text: 'Status' },
  { header: 'vehicle', text: 'Vehicle' },
  { header: 'startPoint', text: 'Start Point' },
  { header: 'endPoint', text: 'End Point' },
  { header: 'view', text: 'View' },
  { header: 'actions', text: 'Actions' },
];
