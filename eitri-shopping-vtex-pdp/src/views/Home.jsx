import Eitri from 'eitri-bifrost'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading, HeaderTemplate, HEADER_TYPE, Spacing } from 'eitri-shopping-vtex-components-shared'
import { openCart } from '../services/NavigationService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { crash, crashLog, sendViewItem } from '../services/trackingService'
import { getProductById, markLastViewedProduct } from '../services/productService'
import { addToWishlist, productOnWishlist, removeItemFromWishlist } from '../services/customerService'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import MainDescription from '../components/MainDescription/MainDescription'
import SkuSelector from '../components/SkuSelector/SkuSelector'
import Freight from '../components/Freight/Freight'
import RichContent from '../components/RichContent/RichContent'
import DescriptionComponent from '../components/Description/DescriptionComponent'
import Reviews from '../components/Reviews/Reviews'
import ActionButton from '../components/ActionButton/ActionButton'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'
import { setLanguage, startConfigure } from '../services/AppService'
import { useTranslation } from 'eitri-i18n'
import BottomFixed from '../components/BottomFixed/BottomFixed'

export default function Home() {
	const { startCart, cart } = useLocalShoppingCart()
	const { i18n } = useTranslation()

	const [product, setProduct] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [configLoaded, setConfigLoaded] = useState(false)
	const [loadingWishlist, setLoadingWishlist] = useState(true)
	const [itemWishlistId, setItemWishlistId] = useState(-1)
	const [currentSku, setCurrentSku] = useState(null)

	useEffect(() => {
		window.scroll(0, 0)
		startHome()
		Eitri.navigation.setOnResumeListener(() => {
			startHome()
		})
	}, [])

	const startHome = async () => {
		setIsLoading(true)

		// const startParams = await Eitri.getInitializationInfos()
		const startParams = { product: {
				"cacheId": "sp-827554724",
				"productId": "827554724",
				"description": "O Kit de tratamento com 2 itens Wella Professionals Invigo Nutri Enrich contém 1 Shampoo de  1000 ml e 1 Condicionador de 1000 ml. Este Kit rende mais aplicações.\r\n\r\nPara cabelos secos, ressecados ou com excesso de química. Recomendamos para uso profissional no salão e também para uso em sua casa. Use o Kit Wella Professionals Invigo Nutri Enrich, com o Shampoo e Condicionador e obtenha mais hidratação e saúde para os seus cabelos.<br><br><strong>Benefícios:</strong><br>Fios desembaraçados e alinhados; \r\nCabelos brilhantes, macios e leves;\r\nNutrição e Hidratação instantânea.<br><br><strong>Modo de usar:</strong><br>Use o shampoo sobre os cabelos molhados, uma quantidade similar ao tamanho de uma moeda de 1 real. Massageie o couro cabeludo até formar espumas. \r\n\r\nEm seguida enxágue e aplique uma quantidade menor do condicionador, pelo comprimento e pontas dos cabelos. Deixe agir por alguns segundos e, em seguida, enxágue bem.",
				"productName": "Kit Wella Professionals Invigo Nutri Enrich - Shampoo 1000 ml + Condicionador 1000 ml",
				"productReference": "",
				"linkText": "kit-wella-professionals-invigo-nutri-enrich-recadastramento-shampoo-1000-ml-condicionador-1000-ml",
				"brand": "Wella Professionals",
				"brandId": 3,
				"link": "/kit-wella-professionals-invigo-nutri-enrich-recadastramento-shampoo-1000-ml-condicionador-1000-ml/p",
				"categories": [
					"/Cabelos/Kits para cabelos/",
					"/Cabelos/",
					"/Marcas/Wella professionals/",
					"/Marcas/"
				],
				"categoryId": "2069088744",
				"categoriesIds": [
					"/1/2069088744/",
					"/1/",
					"/1868885983/496446074/",
					"/1868885983/"
				],
				"priceRange": {
					"sellingPrice": {
						"highPrice": 273.9,
						"lowPrice": 273.9
					},
					"listPrice": {
						"highPrice": 546.9,
						"lowPrice": 546.9
					}
				},
				"specificationGroups": [
					{
						"originalName": "Especificações de Produto",
						"name": "Especificações de Produto",
						"specifications": [
							{
								"originalName": "Observações",
								"name": "Observações",
								"values": [
									"Imagem Meramente Ilustrativa."
								]
							},
							{
								"originalName": "Itens Inclusos",
								"name": "Itens Inclusos",
								"values": [
									"1 Shampoo Wella Professionals Invigo Nutri Enrich 1000 ml.\r\n1 Condicionador Wella Professionals Invigo Nutri Enrich 1000 ml."
								]
							},
							{
								"originalName": "Outlet",
								"name": "Outlet",
								"values": [
									"Não"
								]
							},
							{
								"originalName": "Gênero",
								"name": "Gênero",
								"values": [
									"Unissex"
								]
							},
							{
								"originalName": "Linha",
								"name": "Linha",
								"values": [
									"Invigo Nutri Enrich"
								]
							}
						]
					},
					{
						"originalName": "Filtros do Menu",
						"name": "Filtros do Menu",
						"specifications": [
							{
								"originalName": "Tipo de Cabelo",
								"name": "Tipo de Cabelo",
								"values": [
									"Secos ou Ressecados"
								]
							}
						]
					},
					{
						"originalName": "allSpecifications",
						"name": "allSpecifications",
						"specifications": [
							{
								"originalName": "Observações",
								"name": "Observações",
								"values": [
									"Imagem Meramente Ilustrativa."
								]
							},
							{
								"originalName": "Itens Inclusos",
								"name": "Itens Inclusos",
								"values": [
									"1 Shampoo Wella Professionals Invigo Nutri Enrich 1000 ml.\r\n1 Condicionador Wella Professionals Invigo Nutri Enrich 1000 ml."
								]
							},
							{
								"originalName": "Outlet",
								"name": "Outlet",
								"values": [
									"Não"
								]
							},
							{
								"originalName": "Gênero",
								"name": "Gênero",
								"values": [
									"Unissex"
								]
							},
							{
								"originalName": "Linha",
								"name": "Linha",
								"values": [
									"Invigo Nutri Enrich"
								]
							},
							{
								"originalName": "Tipo de Cabelo",
								"name": "Tipo de Cabelo",
								"values": [
									"Secos ou Ressecados"
								]
							},
							{
								"originalName": "sellerId",
								"name": "sellerId",
								"values": [
									"1"
								]
							}
						]
					}
				],
				"skuSpecifications": [],
				"productClusters": [
					{
						"id": "144",
						"name": "Todos Produtos"
					},
					{
						"id": "776",
						"name": "Wella Professionals | Invigo Nutri Enrich"
					},
					{
						"id": "896",
						"name": "Criteo Todos"
					},
					{
						"id": "2415",
						"name": "Site/Home/Vitrine/1"
					},
					{
						"id": "2505",
						"name": "Card Categoria Cabelo Menu"
					},
					{
						"id": "2882",
						"name": "Kits para cuidar do seu cabelo com até 30% off   Ganhe 4 Brindes nas compras acima de 179"
					},
					{
						"id": "2942",
						"name": "Wella Professionals"
					},
					{
						"id": "3158",
						"name": "Kits Wella - Oferta + Cupom afiliadas"
					},
					{
						"id": "3159",
						"name": "Tamanhos de Salão"
					},
					{
						"id": "3194",
						"name": "Wella - Cronograma Capilar - Produtos de Cabelo - Beleza"
					},
					{
						"id": "3510",
						"name": "AllCategories"
					},
					{
						"id": "3658",
						"name": "indexacao Full"
					},
					{
						"id": "3930",
						"name": "Seleção de Cabelos"
					},
					{
						"id": "3944",
						"name": "Coleção de Kits"
					},
					{
						"id": "3983",
						"name": "Tiktok - Exportação"
					},
					{
						"id": "3987",
						"name": "Página de Marcas | Wella - Prateleira 4 URL"
					},
					{
						"id": "3998",
						"name": "Mínimo 15% OFF"
					},
					{
						"id": "4031",
						"name": "Melhores da Semana"
					},
					{
						"id": "4094",
						"name": "Kits Hair Care"
					},
					{
						"id": "4121",
						"name": "Litros de Economia"
					},
					{
						"id": "4152",
						"name": "Site/Página de Marca/Todos os Produtos/Wella"
					},
					{
						"id": "4189",
						"name": "Todos os produtos"
					},
					{
						"id": "4199",
						"name": "Wella"
					},
					{
						"id": "4223",
						"name": "Wella Kits"
					},
					{
						"id": "4390",
						"name": "Wella e Sebastian - Litros"
					},
					{
						"id": "4425",
						"name": "Kit Wella"
					},
					{
						"id": "4448",
						"name": "Seleção Wella"
					},
					{
						"id": "4489",
						"name": "Kits Wella"
					},
					{
						"id": "4492",
						"name": "Site Todo"
					},
					{
						"id": "4587",
						"name": "Kits Cabelos"
					},
					{
						"id": "4631",
						"name": "Outlet - 2024"
					},
					{
						"id": "4656",
						"name": "Site todo"
					},
					{
						"id": "4685",
						"name": "Site todo - Luxo"
					},
					{
						"id": "4707",
						"name": "Cabelos | Site todo"
					},
					{
						"id": "4753",
						"name": "Seleção mínimo 48% OFF"
					},
					{
						"id": "4755",
						"name": "SMS - 10% extra acima de R$199 com cupom SALESMS"
					},
					{
						"id": "4826",
						"name": "Mais vendidos do dia"
					},
					{
						"id": "5366",
						"name": "Kits  - Várias marcas| Atualizado"
					},
					{
						"id": "5392",
						"name": "Cabelos de Salão"
					},
					{
						"id": "5460",
						"name": "Take Over NAOS"
					},
					{
						"id": "5463",
						"name": "Take Over Braé"
					},
					{
						"id": "5485",
						"name": "TAKE OVER DL"
					},
					{
						"id": "5488",
						"name": "Best Sellers - AMO"
					},
					{
						"id": "5500",
						"name": "Madrugada Lola - 12.11"
					},
					{
						"id": "5505",
						"name": "TAKE OVER TRUSS"
					},
					{
						"id": "5509",
						"name": "Take Over Wella"
					},
					{
						"id": "5515",
						"name": "Take Over Vizcaya"
					},
					{
						"id": "5523",
						"name": "Kits | Cabelos"
					},
					{
						"id": "5526",
						"name": "CRM | Wella nutri enrich"
					},
					{
						"id": "5538",
						"name": "Black Friday | Lojinha da @queridocuidado"
					},
					{
						"id": "5541",
						"name": "Wella + Sebastian"
					},
					{
						"id": "5562",
						"name": "Seleção wella"
					},
					{
						"id": "5571",
						"name": "LIVE AFILIADAS | 27.11 - PROMOSCHIQUE"
					},
					{
						"id": "5573",
						"name": "LIVE AFILIADAS | 28.11 - CAROL TURRI"
					},
					{
						"id": "5574",
						"name": "Push 28.11 - 14h"
					},
					{
						"id": "5575",
						"name": "LIVE AFILIADAS | 28.11 - PROMO DA CAROL"
					},
					{
						"id": "5576",
						"name": "CRM | Os 10 mais vendidos do dia"
					},
					{
						"id": "5585",
						"name": "Cabelos Saudáveis"
					},
					{
						"id": "5600",
						"name": "CRM | OS mais vendidos da semana"
					},
					{
						"id": "5616",
						"name": "Take Over | Braé"
					},
					{
						"id": "5623",
						"name": "CRM | Listinha exclusiva"
					},
					{
						"id": "5624",
						"name": "Take Over - Lola"
					},
					{
						"id": "5626",
						"name": "CRM | Lista de ofertas"
					},
					{
						"id": "5627",
						"name": "Especial Calvin Klein"
					},
					{
						"id": "5634",
						"name": "Take Over | PUIG"
					},
					{
						"id": "5635",
						"name": "CRM | LISTA de achadinhos"
					},
					{
						"id": "5636",
						"name": "CRM | Lista de ofertas"
					},
					{
						"id": "5641",
						"name": "CRM | Lista dos mais vendidos do fds"
					},
					{
						"id": "5661",
						"name": "Take Over LBD"
					},
					{
						"id": "5664",
						"name": "Take Over Wella + Sebastian"
					},
					{
						"id": "5666",
						"name": "Madrugada - Wella"
					},
					{
						"id": "5677",
						"name": "CRM | Oportunidades do dia"
					},
					{
						"id": "5680",
						"name": "Take Over Lancôme"
					},
					{
						"id": "5682",
						"name": "Skincare 15.01"
					},
					{
						"id": "5690",
						"name": "Perfumes de Verão"
					},
					{
						"id": "5707",
						"name": "CRM | Ofertas do dia"
					},
					{
						"id": "5716",
						"name": "CRM | Oportunidades do dia"
					},
					{
						"id": "5718",
						"name": "Take Over - Kérastase"
					},
					{
						"id": "5728",
						"name": "CRM| Oportunidades"
					},
					{
						"id": "5729",
						"name": "AFILIADAS | LIVE PROMO DE GRAZI 29.01"
					},
					{
						"id": "5736",
						"name": "CADIVEU + BEST SELLER"
					}
				],
				"clusterHighlights": [
					{
						"id": "144",
						"name": "Todos Produtos"
					},
					{
						"id": "776",
						"name": "Wella Professionals | Invigo Nutri Enrich"
					},
					{
						"id": "2415",
						"name": "Site/Home/Vitrine/1"
					},
					{
						"id": "2505",
						"name": "Card Categoria Cabelo Menu"
					},
					{
						"id": "2882",
						"name": "Kits para cuidar do seu cabelo com até 30% off   Ganhe 4 Brindes nas compras acima de 179"
					},
					{
						"id": "2942",
						"name": "Wella Professionals"
					},
					{
						"id": "3159",
						"name": "Tamanhos de Salão"
					},
					{
						"id": "3194",
						"name": "Wella - Cronograma Capilar - Produtos de Cabelo - Beleza"
					},
					{
						"id": "3930",
						"name": "Seleção de Cabelos"
					},
					{
						"id": "3944",
						"name": "Coleção de Kits"
					},
					{
						"id": "3998",
						"name": "Mínimo 15% OFF"
					},
					{
						"id": "4031",
						"name": "Melhores da Semana"
					},
					{
						"id": "4094",
						"name": "Kits Hair Care"
					},
					{
						"id": "4121",
						"name": "Litros de Economia"
					},
					{
						"id": "4152",
						"name": "Site/Página de Marca/Todos os Produtos/Wella"
					},
					{
						"id": "4189",
						"name": "Todos os produtos"
					},
					{
						"id": "4199",
						"name": "Wella"
					},
					{
						"id": "4223",
						"name": "Wella Kits"
					},
					{
						"id": "4390",
						"name": "Wella e Sebastian - Litros"
					},
					{
						"id": "4425",
						"name": "Kit Wella"
					},
					{
						"id": "4448",
						"name": "Seleção Wella"
					},
					{
						"id": "4489",
						"name": "Kits Wella"
					},
					{
						"id": "4492",
						"name": "Site Todo"
					},
					{
						"id": "4587",
						"name": "Kits Cabelos"
					},
					{
						"id": "4631",
						"name": "Outlet - 2024"
					},
					{
						"id": "4656",
						"name": "Site todo"
					},
					{
						"id": "4685",
						"name": "Site todo - Luxo"
					},
					{
						"id": "4707",
						"name": "Cabelos | Site todo"
					},
					{
						"id": "4753",
						"name": "Seleção mínimo 48% OFF"
					},
					{
						"id": "4755",
						"name": "SMS - 10% extra acima de R$199 com cupom SALESMS"
					},
					{
						"id": "4826",
						"name": "Mais vendidos do dia"
					},
					{
						"id": "5366",
						"name": "Kits  - Várias marcas| Atualizado"
					},
					{
						"id": "5392",
						"name": "Cabelos de Salão"
					},
					{
						"id": "5460",
						"name": "Take Over NAOS"
					},
					{
						"id": "5463",
						"name": "Take Over Braé"
					},
					{
						"id": "5485",
						"name": "TAKE OVER DL"
					},
					{
						"id": "5488",
						"name": "Best Sellers - AMO"
					},
					{
						"id": "5500",
						"name": "Madrugada Lola - 12.11"
					},
					{
						"id": "5505",
						"name": "TAKE OVER TRUSS"
					},
					{
						"id": "5509",
						"name": "Take Over Wella"
					},
					{
						"id": "5515",
						"name": "Take Over Vizcaya"
					},
					{
						"id": "5523",
						"name": "Kits | Cabelos"
					},
					{
						"id": "5526",
						"name": "CRM | Wella nutri enrich"
					},
					{
						"id": "5538",
						"name": "Black Friday | Lojinha da @queridocuidado"
					},
					{
						"id": "5541",
						"name": "Wella + Sebastian"
					},
					{
						"id": "5562",
						"name": "Seleção wella"
					},
					{
						"id": "5574",
						"name": "Push 28.11 - 14h"
					},
					{
						"id": "5576",
						"name": "CRM | Os 10 mais vendidos do dia"
					},
					{
						"id": "5585",
						"name": "Cabelos Saudáveis"
					},
					{
						"id": "5600",
						"name": "CRM | OS mais vendidos da semana"
					},
					{
						"id": "5616",
						"name": "Take Over | Braé"
					},
					{
						"id": "5623",
						"name": "CRM | Listinha exclusiva"
					},
					{
						"id": "5624",
						"name": "Take Over - Lola"
					},
					{
						"id": "5626",
						"name": "CRM | Lista de ofertas"
					},
					{
						"id": "5627",
						"name": "Especial Calvin Klein"
					},
					{
						"id": "5634",
						"name": "Take Over | PUIG"
					},
					{
						"id": "5635",
						"name": "CRM | LISTA de achadinhos"
					},
					{
						"id": "5636",
						"name": "CRM | Lista de ofertas"
					},
					{
						"id": "5641",
						"name": "CRM | Lista dos mais vendidos do fds"
					},
					{
						"id": "5661",
						"name": "Take Over LBD"
					},
					{
						"id": "5664",
						"name": "Take Over Wella + Sebastian"
					},
					{
						"id": "5677",
						"name": "CRM | Oportunidades do dia"
					},
					{
						"id": "5680",
						"name": "Take Over Lancôme"
					},
					{
						"id": "5682",
						"name": "Skincare 15.01"
					},
					{
						"id": "5690",
						"name": "Perfumes de Verão"
					},
					{
						"id": "5707",
						"name": "CRM | Ofertas do dia"
					},
					{
						"id": "5716",
						"name": "CRM | Oportunidades do dia"
					},
					{
						"id": "5718",
						"name": "Take Over - Kérastase"
					},
					{
						"id": "5728",
						"name": "CRM| Oportunidades"
					},
					{
						"id": "5736",
						"name": "CADIVEU + BEST SELLER"
					}
				],
				"properties": [
					{
						"name": "Observações",
						"originalName": "Observações",
						"values": [
							"Imagem Meramente Ilustrativa."
						]
					},
					{
						"name": "Itens Inclusos",
						"originalName": "Itens Inclusos",
						"values": [
							"1 Shampoo Wella Professionals Invigo Nutri Enrich 1000 ml.\r\n1 Condicionador Wella Professionals Invigo Nutri Enrich 1000 ml."
						]
					},
					{
						"name": "Outlet",
						"originalName": "Outlet",
						"values": [
							"Não"
						]
					},
					{
						"name": "Gênero",
						"originalName": "Gênero",
						"values": [
							"Unissex"
						]
					},
					{
						"name": "Linha",
						"originalName": "Linha",
						"values": [
							"Invigo Nutri Enrich"
						]
					},
					{
						"name": "Tipo de Cabelo",
						"originalName": "Tipo de Cabelo",
						"values": [
							"Secos ou Ressecados"
						]
					},
					{
						"name": "sellerId",
						"originalName": "sellerId",
						"values": [
							"1"
						]
					}
				],
				"items": [
					{
						"sellers": [
							{
								"sellerId": "1",
								"sellerName": "Amobeleza",
								"addToCartLink": "",
								"sellerDefault": true,
								"commertialOffer": {
									"DeliverySlaSamplesPerRegion": {},
									"DeliverySlaSamples": [],
									"AvailableQuantity": 10000,
									"discountHighlights": [],
									"Installments": [
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "American Express",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "American Express à vista"
										},
										{
											"Value": 136.95,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 2,
											"PaymentSystemName": "American Express",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "American Express 2 vezes sem juros"
										},
										{
											"Value": 91.3,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 3,
											"PaymentSystemName": "American Express",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "American Express 3 vezes sem juros"
										},
										{
											"Value": 68.47,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 4,
											"PaymentSystemName": "American Express",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "American Express 4 vezes sem juros"
										},
										{
											"Value": 54.78,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 5,
											"PaymentSystemName": "American Express",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "American Express 5 vezes sem juros"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Visa",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Visa à vista"
										},
										{
											"Value": 136.95,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 2,
											"PaymentSystemName": "Visa",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Visa 2 vezes sem juros"
										},
										{
											"Value": 91.3,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 3,
											"PaymentSystemName": "Visa",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Visa 3 vezes sem juros"
										},
										{
											"Value": 68.47,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 4,
											"PaymentSystemName": "Visa",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Visa 4 vezes sem juros"
										},
										{
											"Value": 54.78,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 5,
											"PaymentSystemName": "Visa",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Visa 5 vezes sem juros"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Diners",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Diners à vista"
										},
										{
											"Value": 136.95,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 2,
											"PaymentSystemName": "Diners",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Diners 2 vezes sem juros"
										},
										{
											"Value": 91.3,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 3,
											"PaymentSystemName": "Diners",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Diners 3 vezes sem juros"
										},
										{
											"Value": 68.47,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 4,
											"PaymentSystemName": "Diners",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Diners 4 vezes sem juros"
										},
										{
											"Value": 54.78,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 5,
											"PaymentSystemName": "Diners",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Diners 5 vezes sem juros"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Mastercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Mastercard à vista"
										},
										{
											"Value": 136.95,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 2,
											"PaymentSystemName": "Mastercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Mastercard 2 vezes sem juros"
										},
										{
											"Value": 91.3,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 3,
											"PaymentSystemName": "Mastercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Mastercard 3 vezes sem juros"
										},
										{
											"Value": 68.47,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 4,
											"PaymentSystemName": "Mastercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Mastercard 4 vezes sem juros"
										},
										{
											"Value": 54.78,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 5,
											"PaymentSystemName": "Mastercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Mastercard 5 vezes sem juros"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Hipercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Hipercard à vista"
										},
										{
											"Value": 136.95,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 2,
											"PaymentSystemName": "Hipercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Hipercard 2 vezes sem juros"
										},
										{
											"Value": 91.3,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 3,
											"PaymentSystemName": "Hipercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Hipercard 3 vezes sem juros"
										},
										{
											"Value": 68.47,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 4,
											"PaymentSystemName": "Hipercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Hipercard 4 vezes sem juros"
										},
										{
											"Value": 54.78,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 5,
											"PaymentSystemName": "Hipercard",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Hipercard 5 vezes sem juros"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Elo",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Elo à vista"
										},
										{
											"Value": 136.95,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 2,
											"PaymentSystemName": "Elo",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Elo 2 vezes sem juros"
										},
										{
											"Value": 91.3,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 3,
											"PaymentSystemName": "Elo",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Elo 3 vezes sem juros"
										},
										{
											"Value": 68.47,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 4,
											"PaymentSystemName": "Elo",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Elo 4 vezes sem juros"
										},
										{
											"Value": 54.78,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 5,
											"PaymentSystemName": "Elo",
											"PaymentSystemGroupName": "creditCardPaymentGroup",
											"Name": "Elo 5 vezes sem juros"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Vale",
											"PaymentSystemGroupName": "giftCardPaymentGroup",
											"Name": "Vale à vista"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "PicPay",
											"PaymentSystemGroupName": "picPayPaymentGroup",
											"Name": "PicPay à vista"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "AmeDigital",
											"PaymentSystemGroupName": "AmeDigitalPaymentGroup",
											"Name": "AmeDigital à vista"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "Pix",
											"PaymentSystemGroupName": "instantPaymentPaymentGroup",
											"Name": "Pix à vista"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "MercadoPagoPro",
											"PaymentSystemGroupName": "MercadoPagoProPaymentGroup",
											"Name": "MercadoPagoPro à vista"
										},
										{
											"Value": 273.9,
											"InterestRate": 0,
											"TotalValuePlusInterestRate": 273.9,
											"NumberOfInstallments": 1,
											"PaymentSystemName": "BoletoParceladoKoin",
											"PaymentSystemGroupName": "BoletoParceladoKoinPaymentGroup",
											"Name": "BoletoParceladoKoin à vista"
										}
									],
									"Price": 273.9,
									"ListPrice": 546.9,
									"spotPrice": 273.9,
									"taxPercentage": 0,
									"PriceWithoutDiscount": 273.9,
									"Tax": 0,
									"GiftSkuIds": [],
									"BuyTogether": [],
									"ItemMetadataAttachment": [],
									"RewardValue": 0,
									"PriceValidUntil": "2026-02-05T21:43:50Z",
									"GetInfoErrorMessage": null,
									"CacheVersionUsedToCallCheckout": "",
									"teasers": []
								}
							}
						],
						"images": [
							{
								"imageId": "211465",
								"cacheId": "211465",
								"imageTag": "",
								"imageLabel": "F0",
								"imageText": "F0",
								"imageUrl": "https://amobeleza.vtexassets.com/arquivos/ids/211465/kit_wella_professionals_invigo_nutri_enrich_-_shampoo_1000_ml_-_condicionador_1000_ml_F0.jpg?v=637776942427330000"
							},
							{
								"imageId": "211466",
								"cacheId": "211466",
								"imageTag": "",
								"imageLabel": "F1",
								"imageText": "F1",
								"imageUrl": "https://amobeleza.vtexassets.com/arquivos/ids/211466/kit_wella_professionals_invigo_nutri_enrich_-_shampoo_1000_ml_-_condicionador_1000_ml_F1.jpg?v=637776942436400000"
							},
							{
								"imageId": "211467",
								"cacheId": "211467",
								"imageTag": "",
								"imageLabel": "F2",
								"imageText": "F2",
								"imageUrl": "https://amobeleza.vtexassets.com/arquivos/ids/211467/kit_wella_professionals_invigo_nutri_enrich_-_shampoo_1000_ml_-_condicionador_1000_ml_F2.jpg?v=637776942441900000"
							},
							{
								"imageId": "211468",
								"cacheId": "211468",
								"imageTag": "",
								"imageLabel": "F3",
								"imageText": "F3",
								"imageUrl": "https://amobeleza.vtexassets.com/arquivos/ids/211468/kit_wella_professionals_invigo_nutri_enrich_-_shampoo_1000_ml_-_condicionador_1000_ml_F3.jpg?v=637776942448130000"
							}
						],
						"itemId": "6995",
						"name": "Kit Wella Professionals Invigo Nutri Enrich - Shampoo 1000 ml + Condicionador 1000 ml",
						"nameComplete": "Kit Wella Professionals Invigo Nutri Enrich - Shampoo 1000 ml + Condicionador 1000 ml",
						"complementName": "1010428206570",
						"referenceId": [
							{
								"Key": "RefId"
							}
						],
						"measurementUnit": "un",
						"unitMultiplier": 1,
						"variations": [],
						"ean": "1010428206570",
						"modalType": "",
						"videos": [],
						"attachments": [],
						"isKit": false,
						"attributes": []
					}
				],
				"releaseDate": 1642032000000,
				"metaTagDescription": "",
				"origin": "intelligent-search",
				"productTitle": ""
			} }

		let product = await startParams.product

		if (product) {
			setProduct(product)
			setCurrentSku(product.items[0])
			setIsLoading(false)
		}

		await loadConfigs()
		setLanguage(i18n)

		product = await loadProduct(startParams)
		if (product) {
			setProduct(product)
			setCurrentSku(product.items[0])
			setIsLoading(false)
		}

		setConfigLoaded(true)

		await loadCart(startParams)

		sendViewItem(product)
		markLastViewedProduct(product)
	}

	const handleSaveFavorite = async () => {
		setLoadingWishlist(true)
		if (itemWishlistId === -1) {
			try {
				const result = await addToWishlist(product?.productId, product?.productName, product?.items[0]?.itemId)
				setItemWishlistId(result?.data?.addToList)
			} catch (e) {
				console.error('handleSaveFavorite: Error', e)
			}
		} else {
			await removeItemFromWishlist(itemWishlistId)
			setItemWishlistId(-1)
		}
		setLoadingWishlist(false)
	}

	const handleShare = async linkText => {
		const { host } = Vtex.configs
		await Eitri.share.link({
			url: `${host}/${linkText}/p`
		})
	}

	const navigateCart = () => {
		openCart(cart)
	}

	const loadProduct = async startParams => {
		try {
			if (startParams.productId) {
				const product = await getProductById(startParams.productId)
				setProduct(product)
				return product
			}
		} catch (e) {
			console.error('loadProduct: Error', e)
			return null
		}
	}

	const loadCart = async startParams => {
		if (startParams?.orderFormId) {
			await Eitri.sharedStorage.setItem('vtex_cart_key', startParams?.orderFormId)
		}
		await startCart()
	}

	const loadConfigs = async () => {
		try {
			await startConfigure()
		} catch (e) {
			crashLog('Erro ao buscar configurações', e)
			crash()
		}
	}

	const isProductInCart = productId => {
		return cart?.items?.some(productInCart => {
			return productInCart.productId === productId
		})
	}

	const checkIfIsFavorite = async productId => {
		setLoadingWishlist(true)
		const { inList, listId } = await productOnWishlist(productId)
		if (inList) {
			setItemWishlistId(listId)
		}
		setLoadingWishlist(false)
	}

	const onSkuChange = newDesiredVariations => {
		const productSku = product.items.find(item => {
			return newDesiredVariations.every(
				newDesiredVariation => item[newDesiredVariation.variation][0] === newDesiredVariation.value
			)
		})
		if (productSku) {
			setCurrentSku(productSku)
		}
	}

	return (
		<Window
			title='[pdp] - Home'
			bottomInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_SHARE_AND_CART}
				handleShare={() => handleShare(product?.linkText)}
				quantityOfItems={cart?.items?.length}
				navigateToCart={navigateCart}
			/>

			<Loading
				isLoading={isLoading}
				fullScreen
			/>

			{product && (
				<View>
					<ImageCarousel currentSku={currentSku} />

					<View padding='large'>
						<MainDescription
							product={product}
							currentSku={currentSku}
						/>

						<SkuSelector
							currentSku={currentSku}
							product={product}
							onSkuChange={onSkuChange}
							marginTop={'large'}
						/>

						<Freight currentSku={currentSku} />

						<RichContent product={product} />

						<DescriptionComponent marginTop='small' product={product} />

						<Reviews />

					</View>

					<View marginBottom='large'>
						{configLoaded && <RelatedProducts product={product} />}
					</View>

					<BottomFixed backgroundColor='accent-100'>
						<ActionButton currentSku={currentSku} />
					</BottomFixed>
				</View>
			)}
		</Window>
	)
}
