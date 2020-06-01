import Chance from "chance";

export default (num) => {
  let arr = [];
  const chance = new Chance();
  for (let i = 0; i < num; i++) {
    arr.push({
      first: chance.name(),
      last: chance.last(),
      birthday: chance.birthday({ string: true }),
      zip: chance.zip(),
      gender: chance.character({ pool: "MF" }),
    });
  }
  return arr;
};

export const headers = [
  {
    Header: "First",
    accessor: "first",
  },
  {
    Header: "Last",
    accessor: "last",
  },
  {
    Header: "Birthday",
    accessor: "birthday",
    filter: "year",
    sortable: true,
  },
  {
    Header: "Zip",
    accessor: "zip",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
];
