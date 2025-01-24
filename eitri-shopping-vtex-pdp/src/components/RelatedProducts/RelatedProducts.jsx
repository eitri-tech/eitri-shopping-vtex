import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { useTranslation } from 'eitri-i18n'
import {getWhoSawAlsoSaw} from "../../services/productService";

export default function RelatedProducts (props) {

  const { product } = props
  const { t } = useTranslation()

  const [relatedProducts, setRelatedProducts] = useState(null)

  useEffect(() => {
    if (!product) return
    loadRelatedProducts(product?.productId)
  }, [product])

  const loadRelatedProducts = async productId => {
    try {
      let relatedProducts = await getWhoSawAlsoSaw(productId)
      setRelatedProducts(relatedProducts)
      return relatedProducts
    } catch (e) {
      console.log('loadRelatedProducts: Error', e)
    }
  }

  if (!relatedProducts) return null;

  return (
    <View paddingVertical='small'>
      <Text
        fontSize='large'
        fontWeight='bold'>
        {t('productBasicTemplate.txtWhoSaw')}
      </Text>
      <ProductCarousel products={relatedProducts} />
    </View>
  )
}
