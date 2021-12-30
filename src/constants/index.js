const TABLE_NAMES = [
  'categories',
  'customers',
  'employee_territories',
  'employees',
  'order_details',
  'orders',
  'products',
  'regions',
  'shippers',
  'suppliers',
  'territories',
];
const SELECT_QUERY = 'Select * from';
const TABLE_RESOURCE =
  'https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/';
const TOAST_SETTINGS = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export { TABLE_RESOURCE, TABLE_NAMES, SELECT_QUERY, TOAST_SETTINGS };
