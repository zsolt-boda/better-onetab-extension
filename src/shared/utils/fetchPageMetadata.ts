import axios from 'axios'
import type { PageMetadata } from '../types'
import { JSDOM } from 'jsdom'

export const fetchPageMetadata = async (url: string): Promise<PageMetadata> => {
  const result: PageMetadata = {
    status: 'loading',
    description: null,
    img: null
  }

  try {
    const response = await axios.get<string>(url, { responseType: 'text' })
    const dom = new JSDOM(response.data)
    const document = dom.window.document

    const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
    const image = document
      .querySelector('meta[property="og:image"], meta[name="og:image"]')
      ?.getAttribute('content')

    result.status = 'finished'
    result.description = description
    result.img = image
  } catch (error) {
    result.status = 'error'
  }

  return result
}
