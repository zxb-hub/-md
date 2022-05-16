const maxProfit = (prices:number[])=>{
  let num:number = 0
  let list:number[] = []
  list = prices.map((i:number, index:number) => {
    return prices[1 + index] - i
  })
  list.forEach((i:number)=>{
    if(i>=0) {
      num += i
    }
  })
  return num
}