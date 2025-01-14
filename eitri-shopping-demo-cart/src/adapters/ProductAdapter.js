import { formatAmount } from "../../utils/utils"

export default function adaptProduct(product) {
	try {
		let adaptedProduct = {
			productId: product.productId,
			productName: product.productName,
			brand: product.brand,
			productReference: product.productReference,
			description: product.description,
			categoryId: product.categoryId,
			linkText: product.linkText,
			clusterHighlights: product.clusterHighlights,
			categoryHierarchy: product.categoriesIds ? product.categoriesIds[0] : '',
			items: product.items.map(item => {
				const _sellers = item.sellers.map(seller => {
					return {
						sellerId: seller.sellerId,
						sellerName: seller.sellerName,
						sellerDefault: seller.sellerDefault,
						displayedPrice: formatAmount(seller.commertialOffer?.Price || seller.Price),
						displayedListPrice: formatAmount(seller.commertialOffer?.ListPrice || seller.ListPrice),
						price: seller.commertialOffer?.Price || seller.Price,
						listPrice: seller.commertialOffer?.ListPrice || seller.ListPrice,
						priceWithoutDiscount:
							seller.commertialOffer?.PriceWithoutDiscount || seller.PriceWithoutDiscount,
						availableQuantity: seller.commertialOffer?.AvailableQuantity || seller.AvailableQuantity,
						isAvailable:
							typeof seller.commertialOffer?.IsAvailable === 'boolean'
								? seller.commertialOffer?.IsAvailable
								: seller.commertialOffer.AvailableQuantity > 0,
						installments: seller.commertialOffer?.Installments || seller.Installments
					}
				})

				return {
					itemId: item.itemId,
					name: item.name,
					nameComplete: item.nameComplete,
					ean: item.ean,
					isKit: item.isKit,
					images: item.images.map(image => {
						return {
							imageUrl: image.imageUrl,
							imageText: image.imageText
						}
					}),
					installments: discoverInstallments(item),
					mainImage:
						product.itemMetadata?.items?.find(itemMetadata => itemMetadata.id === item.itemId)?.MainImage ||
						item.images[0].imageUrl,
					sellers: _sellers,
					mainSeller: structuredClone(_sellers.find(seller => seller.sellerDefault) || _sellers[0])
				}
			})
		}
		if (product?.allSpecifications) {
			adaptedProduct.allSpecifications = buildSpecifications(product)
		}
		return adaptedProduct
	} catch (error) {
		console.log('Erro ao adaptar produto', error)
		return null
	}
}

const buildSpecifications = (product) => {
	let result = {}
	product?.allSpecifications?.forEach(element => {
		result[element] = product[element]
	});

	return [result]
}

export function adaptProductList(products) {
	return products.map(product => adaptProduct(product)).filter(product => !!product)
}

const discoverInstallments = item => {
	try {
		const mainSeller = item.sellers.find(seller => seller.sellerDefault)
		if (mainSeller) {
			const betterInstallment = mainSeller.commertialOffer.Installments.reduce((acc, installment) => {
				if (!acc) {
					acc = installment
					return acc
				} else {
					if (installment.NumberOfInstallments > acc.NumberOfInstallments) {
						acc = installment
					}
					return acc
				}
			}, null)

			return `Em até ${betterInstallment.NumberOfInstallments}x de ${formatAmount(betterInstallment.Value)}`
		}
		return ''
	} catch (error) {
		return ''
	}
}
