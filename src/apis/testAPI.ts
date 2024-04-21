import httpInstance from '@/utils/http'

function getCategory() {
  return httpInstance.get('home/category/head')
}

export default getCategory
