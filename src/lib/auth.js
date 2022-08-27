export function getLoggedInUserId() {
  if (!localStorage) return false
  const token = localStorage.getItem("token")

  if (!token) return false

  const middlePart = token.split('.')[1]
  const decodedString = window.atob(middlePart)
  const decodedObj = JSON.parse(decodedString)
  console.log(decodedObj);
  return decodedObj.userId
}


export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  return userIdToCompare === getLoggedInUserId()
}

