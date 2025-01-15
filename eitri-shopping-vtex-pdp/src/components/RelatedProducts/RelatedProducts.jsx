import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { useTranslation } from 'eitri-i18n'
import {useLocalShoppingCart} from "../../providers/LocalCart";
import {openCart, openProduct} from "../../services/NavigationService";
import {getWhoSawAlsoSaw} from "../../services/productService";

export default function RelatedProducts (props) {

  const { cart, addItem } = useLocalShoppingCart()
  const { product } = props
  const { t } = useTranslation()

  const [relatedProducts, setRelatedProducts] = useState(null)

  useEffect(() => {
    // console.log('RelatedProducts: productId', product)
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

  const addToCart = async productId => {
    const mainSeller = product?.items[0]?.sellers[0]?.sellerId
    return await addItem({
      quantity: '1',
      id: productId,
      seller: mainSeller
    })
  }

  const isProductInCart = productId => {
    return cart?.items?.some(productInCart => {
      return productInCart.productId === productId
    })
  }

  const navigateCart = () => {
    openCart(cart)
  }

  const navigateToProduct = async product => {
    await openProduct(product)
  }

  if (!relatedProducts) return null;

  return (
    <View paddingVertical='small'>
      <Text
        fontSize='large'
        fontWeight='bold'>
        {t('productBasicTemplate.txtWhoSaw')}
      </Text>
      <ProductCarousel
        addToCart={addToCart}
        products={relatedProducts}
        isProductInCart={isProductInCart}
        navigateCart={navigateCart}
        navigateToProduct={navigateToProduct}
        borderColor={'neutral-300'}
      />
    </View>
  )
}
