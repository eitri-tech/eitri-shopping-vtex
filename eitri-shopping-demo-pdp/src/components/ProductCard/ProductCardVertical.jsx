import wishilist from "../../assets/images/wishlist.svg";
import Rating from "../Rating/Rating";
import { Loading } from "eitri-shopping-demo-shared";
import { useTranslation } from 'eitri-i18n'

export default function ProductCardVertical(props) {
  const {
    ratingValue,
    ratingsCount,
    listPrice,
    image,
    name,
    price,
    width,
    installments,
    isInCart,
    onPress,
    onAddToCart,
    badge,
    alreadyInCart,
    product,
    navigateToProduct,
    borderColor,
  } = props;

  const [buttonIsLoading, setButtonIsLoading] = useState(null);

  const { t } = useTranslation()

  const onPressCard = () => {
    if (onPress && typeof onPress === "function") {
      onPress();
    }
  };

  const onPressAddToCart = async () => {
    let productId = product?.items[0]?.itemId || product?.productId
    setButtonIsLoading(true);
    await onAddToCart(productId);
    setButtonIsLoading(false);
  };

  return (
    <View
      position="relative"
      minWidth={width || "auto"}
      maxWidth={width || "auto"}
      borderRadius="medium"
      padding="small"
      elevation="low"
    >
      <Touchable onPress={() => navigateToProduct(product)} direction="column">
        {badge ? (
          <View
            maxHeight="27px"
            minHeight="27px"
            borderRadius="pill"
            width="fit-content"
            backgroundColor="positive-300"
            paddingHorizontal="large"
            paddingVertical="quark"
          >
            <Text fontWeight="bold" fontFamily="Baloo 2">
              {badge}
            </Text>
          </View>
        ) : (
          <View height="27px" />
        )}

        <View
          display="flex"
          width="100%"
          justifyContent="center"
          borderRadius="micro"
          alignItems="center"
          height="145px"
        >
          <ImageView
            src={image}
            maxWidth="100%"
            borderRadius="micro"
            maxHeight="100%"
          />
        </View>

        <View
          marginTop="small"
          display="flex"
          justifyContent="between"
          maxHeight="36px"
          minHeight="36px"
          gap={4}
        >
          <Text lineClamp={2} fontWeight="medium" fontSize="extra-small">
            {name}
          </Text>
          <Touchable onPress={() => console.log("wishlist")}>
            <Image src={wishilist} width="24px" height="24px" />
          </Touchable>
        </View>

        <View direction="column" gap={2} marginTop="nano">
          {listPrice ? (
            <Text
              textDecoration="line-through"
              fontWeight="bold"
              color="neutral-500"
              fontSize="nano"
            >
              {listPrice}
            </Text>
          ) : (
            <View height="16px" />
          )}

          <Text fontWeight="bold" color="primary-700" fontSize="small">
            {price}
          </Text>

          {installments && (
            <Text fontWeight="bold" color="neutral-500" fontSize="nano">
              {installments}
            </Text>
          )}
        </View>
      </Touchable>

      <Touchable
        marginTop="nano"
        height="36px"
        width="100%"
        borderRadius="pill"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderColor={"primary-700"}
        borderWidth="hairline"
        backgroundColor={buttonIsLoading ? "neutral-100" : "primary-700"}
        onPress={alreadyInCart ? onPressCard : () => onPressAddToCart()}
      >
        {buttonIsLoading ? (
          <Loading width="36px" />
        ) : (
          <Text
            color="background-color"
            fontWeight="medium"
            fontSize="extra-small"
          >
            {alreadyInCart ? t('productCardVertical.txtSeeCart') : t('productCardVertical.txtBuy')}
          </Text>
        )}
      </Touchable>
    </View>
  );
}
