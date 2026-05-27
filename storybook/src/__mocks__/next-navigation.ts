export const useRouter = () => ({
  back: () => {},
  forward: () => {},
  push: () => {},
  refresh: () => {},
  replace: () => {},
})

export const usePathname = () => '/'
export const useSearchParams = () => new URLSearchParams()
export const useParams = () => ({})
export const redirect = () => {}
export const permanentRedirect = () => {}
export const notFound = () => {}
