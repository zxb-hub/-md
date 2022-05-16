const removeDuplicates = (nums) => {
  // 读写指针
  let p1 = 0,
    p2 = 0;
  while (p2 < nums.length) {
    if (nums[p1] !== nums[p2]) {
      p1++;
      nums[p1] = nums[p2];
    }
    p2++;
  }
  return p1+1;
};

console.log(removeDuplicates([1, 1, 2]));
