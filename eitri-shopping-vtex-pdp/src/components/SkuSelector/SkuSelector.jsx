import { useTranslation } from 'eitri-i18n'

export default function SkuSelector (props) {
  const { product, currentSku, onSkuChange, marginTop } = props

  const { t } = useTranslation()

  const handleSkuChange = (variation, value) => {
    onSkuChange(variation, value)
  }

  if (!(product?.skuSpecifications?.length > 0)) {
    return null
  }

  return (
    <View marginTop={marginTop}>
      {
        product?.skuSpecifications?.map((sku, index) => (
          <View>
            <Text fontWeight='bold' fontSize='medium'>{`${t('skuSelector.txtSelect')} ${sku?.field?.name}` }</Text>
            <View display='flex' gap={16} marginTop="nano">
              {
                sku?.values?.map((value) => (
                  <Touchable display='flex' alignItems='center' gap={8} onPress={() => handleSkuChange(sku?.field?.name, value?.name)}>
                    <Radio checked={currentSku?.[sku?.field?.name][0] === value?.name} onChange={_ => {}} />
                    <Text fontSize='extra-small'>{value?.name}</Text>
                  </Touchable>
                ))
              }
            </View>
          </View>
        ))
      }
    </View>
  )

}
