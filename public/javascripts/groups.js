const listGroup = document.getElementById('list-groups');
const linkAttr = listGroup.getAttribute('href');
const leftSidebar = document.getElementById('left-sidebar');
const formGroup = document.getElementById('form-create-group');
const input = document.getElementById('name-group');
const action = formGroup.getAttribute('action');

console.log(formGroup);
console.log(action);

listGroup.addEventListener('click', async (e) => {
  e.preventDefault();
  const resp = await axios.get(linkAttr);

  if (resp) leftSidebar.textContent = resp.data;
});
formGroup.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(action.value);
  const resp = await axios.post(action, { name: input.value });
  console.log(resp.data.name);
  leftSidebar.textContent = resp.data.name;
});
