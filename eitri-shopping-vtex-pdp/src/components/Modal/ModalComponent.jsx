import { CustomButton, Divisor } from 'eitri-shopping-vtex-components-shared'
import ProductCarousel from '../ProductCarousel/ProductCarousel'
import { useTranslation } from 'eitri-i18n'

export default function ModalComponent(props) {

    const { product, addToCart, reviewsRate, relatedProducts, isProductInCart, navigateCart, showModal, closeModal, navigateToProduct, onCart } = props

    const { t } = useTranslation()

    return (
        <Modal show={showModal} position={'bottom'} showBackdrop={true} onClose={() => closeModal()}>
            <View
                display='flex'
                justifyContent='center'
                backgroundColor="accent-100"
                borderWidth='hairline'
                width="100vw"
                borderRadius='circular'
                borderColor='neutral-300'
                direction='column'
                paddingHorizontal='medium'
                height='800px'
            >
                <View
                    display='flex'
                    alignItems='center'
                    justifyContent='between'
                    width='100%'
                    paddingHorizontal='medium'
                    paddingVertical='large'
                    marginVertical='medium'
                >
                    <Text fontSize='large' fontWeight='bold'>{t('modalComponent.txtProductAdded')}</Text>
                    <Touchable onPress={closeModal}>
                        <View
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            borderRadius='circular'
                            width={40}
                            height={40}
                            backgroundColor={'neutral-100'}
                            borderColor={'neutral-300'}
                            borderWidth={'hairline'}
                            position='relative'>
                            <View
                                width='14px'
                                height='14px'
                                position='absolute'
                                top={-3}
                                right={12}
                                alignItems='center'
                                justifyContent='center'>
                                <Icon
                                    iconKey='x'
                                    color={'neutral-900'}
                                    width={14}
                                />
                            </View>
                        </View>
                    </Touchable>
                </View>
                <Divisor />
                <View
                    display='flex'
                    alignItems='center'
                    justifyContent='between'
                    width='100%'
                    paddingHorizontal='medium'
                    paddingVertical='large'
                    marginVertical='medium'
                >
                    <Image src={product?.items[0]?.images[0]?.imageUrl} height="100px" />
                    <View>
                        <Text fontWeight='bold' fontSize='small'>{product?.productName}</Text>
                        <View>
                            <Text color='neutral-500'>{t('modalComponent.txtQuantity')}</Text>
                            <Text>1</Text>
                        </View>
                    </View>
                </View>
                <View
                    display='flex'
                    alignItems='center'
                    justifyContent='between'
                    width='100%'
                    paddingHorizontal='medium'
                >
                    <CustomButton
                        marginTop='large'
                        label={onCart ? t('modalComponent.txtGoToCart') : t('modalComponent.txtAddToCart')}
                        onPress={onCart ? navigateCart : () => addItemOnCart(product?.productId)}
                        // isLoanding={buttonIsLoading}
                        block
                    />
                </View>
                <View
                    display='flex'
                    direction='column'
                    justifyContent='between'
                    width='100%'
                    paddingHorizontal='medium'
                    paddingVertical='large'
                >
                    <Text fontSize='large' fontWeight='bold'>{t('modalComponent.txtBuyTogether')}</Text>
                    <ProductCarousel
                        addToCart={addToCart}
                        products={relatedProducts}
                        reviewsRate={reviewsRate}
                        isProductInCart={isProductInCart}
                        navigateCart={navigateCart}
                        navigateToProduct={navigateToProduct}
                        borderColor={'neutral-300'}
                    />
                </View>
            </View>
        </Modal>
    )
}
