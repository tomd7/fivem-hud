const groups = [];
const groupElements = document.querySelectorAll('.group');

for (const groupElement of groupElements) {
    const group = new Group(groupElement);
    groups.push(group);
}
