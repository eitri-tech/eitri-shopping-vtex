import { Loading } from "eitri-shopping-vtex-components-shared";
import ProductCardWrapper from "../ProductCardWrapper/ProductCardWrapper";
import { useTranslation } from 'eitri-i18n'

export default function SearchResults(props) {
  const { searchResults, isLoading, locale, currency } = props;

  const { t } = useTranslation()

  if (searchResults.length === 0 && !isLoading) {
    return <Text>{t('searchResults.resultNotFound')}</Text>;
  }

  return (
      <View direction="column" gap={16}>
        {searchResults.map(
          (product, index) =>
            index % 2 === 0 && (
              <View key={searchResults[index].productId} display="flex">
                <View width="50%" paddingRight="nano">
                  <ProductCardWrapper vtexProduct={searchResults[index]} locale={locale} currency={currency} />
                </View>
                {searchResults[index + 1] && (
                  <View width="50%" paddingLeft="nano">
                    <ProductCardWrapper
                      vtexProduct={searchResults[index + 1]} locale={locale} currency={currency}
                    />
                  </View>
                )}
              </View>
            )
        )}
        {isLoading && (
          <View display="flex" alignItems="center" justifyContent="center">
            <Loading />
          </View>
        )}
      </View>
  );
}
