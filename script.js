const getTreeOfValues = (tree) => {
    const {value, children} = tree;

    if (!children) {
        return value;
    }
    return [value, children.map(getTreeOfValues)];
};

const getArrayOfValues = (array) => {
    if (Array.isArray(array)) {
        return array.reduce(function (prev, curr) {
            return prev.concat(getArrayOfValues(curr));
        }, []);
    } else {
        return array;
    }
};

const getDesiredNode = (tree, desiredValue) => {
    const {value, children} = tree;

    if (children) {
        if (value === desiredValue) {
            return tree
        }
        return children.map(item => getDesiredNode(item, desiredValue));
    }
};

const average = (graph) => {
    const arrayOfValues = getArrayOfValues(getTreeOfValues(graph));
    const sumOfValues = arrayOfValues.reduce((curr, prev) => curr + prev, 0);

    return sumOfValues / arrayOfValues.length
};

const min = (graph) => {
    const arrayOfValues = getArrayOfValues(getTreeOfValues(graph));
    const minValue = arrayOfValues.sort((a, b) => a - b)[0];
    const node = getArrayOfValues(getDesiredNode(graph, minValue));

    return node.filter(item => item)[0];
};

const max = (graph) => {
    const treeOfValues = getTreeOfValues(graph);
    const arrayOfValues = getArrayOfValues(treeOfValues);
    const maxValue = arrayOfValues.sort((a, b) => b - a)[0];
    const node = getArrayOfValues(getDesiredNode(graph, maxValue));

    return node.filter(item => item)[0];
};

console.log(average(graph));
console.log(min(graph));
console.log(max(graph));
