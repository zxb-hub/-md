export function flat(arr: any) {
  const newArr: any = arr.reduce((previousValue: any, currentValue: any) => {
    return getTo(currentValue, previousValue)
  }, [])
  return newArr
}
function getTo(item: any, newArr: any) {
  const data1: any = newArr.findIndex((items: any) => items.name === item.chain_level1)
  // 数组中找不到chain_level1
  if (data1 === -1) {
    newArr.push({
      name: item.chain_level1,
      children: [
        {
          name: item.chain_level2,
          children: [
            {
              name: item.chain_level3,
              children: item.chain_level4 ? [{ name: item.chain_level4 }] : []
            }
          ]
        }
      ]
    })
  } else {
    const data2: any = newArr[data1].children.findIndex((items: any) => items.name === item.chain_level2)
    if (data2 === -1) {
      newArr[data1].children.push({
        name: item.chain_level2,
        children: [
          {
            name: item.chain_level3,
            children: item.chain_level4 ? [{ name: item.chain_level4 }] : []
          }
        ]
      })
    } else {
      const data3 = newArr[data1].children[data2].children.findIndex((items: any) => items.name === item.chain_level3)
      if (data3 === -1) {
        newArr[data1].children[data2].children.push({
          name: item.chain_level3,
          children: item.chain_level4 ? [{ name: item.chain_level4 }] : []
        })
      } else {
        if (item.chain_level4) {
          const data4 = newArr[data1].children[data2].children[data3].children.push({ name: item.chain_level4 })
          console.log(data4)
        }
      }
    }
  }
  return newArr
}
