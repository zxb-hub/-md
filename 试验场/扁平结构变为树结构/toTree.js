
function main(list) {
  const one = [] // 标记存储一级
  let two = [] // 标记存储二级
  let three = []// 标记存储三级
  let four = []// 标记存储四级
  const tree = [] // 输出数组
  list.forEach((item) => {
    let oneIndex = one.findIndex(i=>i===item.chain_level1) // 查找一级是否已存在
    let twoIndex = null
    let threeIndex = null
    let fourIndex = null
    if(oneIndex===-1) {// 不存在，此一级第一次出现
      one.push(item.chain_level1) // 存储起来
      two = [] // 清空二级标记，防止一级不同二级相同情况，二三级相同处理
      three = []
      four = []
      tree.push({ // 推入tree数组中
        name: item.chain_level1,
        children: []
      })
    }
    twoIndex = two.findIndex(i=>i===item.chain_level2) // 查找二级是否已存在
    const targetTwoItem = tree.filter(k=>k.name===item.chain_level1)[0] // 在目标一级标签中获取相应二级标签
    if(twoIndex===-1) { // 不存在该二级标签，第一次出现
      two.push(item.chain_level2) // 存储起来
      three = [] // 清空三级及四级存储标签
      four = []
      targetOneItem.children.push({
        name: item.chain_level2,
        children: []
      })
    }
    threeIndex = three.findIndex(i=>i===item.chain_level3)// 查找三级是否已存在
    const targetThreeItem = targetTwoItem.children.filter(k=>k.name===item.chain_level2)[0]// 在目标二级标签内部查找相应三级标签
    if(threeIndex===-1) {
      three.push(item.chain_level3)
      four = []
      targetTwoItem.children.push({
        name: item.chain_level3,
        children: []
      })
    }
    fourIndex = four.findIndex(i=>i===item.chain_level4)// 查找四级是否已存在
    const targetFourItem = targetThreeItem.children.filter(k=>k.name===item.chain_level3)[0] // 在目标三级标签中查找响应四级标签
    if(fourIndex===-1) {
      four.push(item.chain_level4)// 标记四级标签
      // 添加新的一级时，注意清空下面所有标记数组
      targetFourItem.children.push(item.chain_level4) // 四级为末级标签，直接使用其值，如有五级六级可仿照上面进行继续添加
    }
  })
  return tree
}


console.log(main(data))