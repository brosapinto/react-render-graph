const convertNode = (node) => {
    return {
        icon: '#',
        name: node.label,
        description: 'Comming Soon',
        position: {
            x: node.x,
            y: node.y
        }
    }
}

const convertEdge = (edge, points) => {
    return {...edge, ...points}
}

export default { convertNode, convertEdge };