interface Person {
  name: string;
  sex: string;
}
export const getPerson = (person: Person) => {
  let p = <Person>{
    name: "test",
  }
  return p;
};