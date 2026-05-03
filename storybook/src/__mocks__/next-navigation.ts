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
