import {getProductById} from "../../services/productService";

export default function RichContent(props) {
  const { product } = props

  const [richContent, setRichContent] = useState(null)

  useEffect(() => {
    if (product) {
      if (product["Conteudo Enriquecido"]) {
        setRichContent(product["Conteudo Enriquecido"])
      } else {
        getProductById(product.productId).then((product) => {
          if (product["Conteudo Enriquecido"]) {
            setRichContent(product["Conteudo Enriquecido"])
          }
        })
      }
    }
  }, [product]);

  if (!richContent) return null;

  return (
    <Webview htmlString={richContent} autoHeight />
  )
}
