import {transformJsonToJs} from '../../scripts/modules/json.js';
import {removeElementById} from '../../scripts/modules/html-elements.js';
import {dateDifference} from '../../scripts/modules/date.js';

function filterProductProperties(productProperties) {
    let newProductProperties = {};
    for (const index in productProperties) {
        newProductProperties[index] = {};
        for (const key in productProperties[index]) {
            if (key === 'skuPropertyId'
                || key === 'skuPropertyName') {
                newProductProperties[index][key] = productProperties[index][key];
            } else if (key === 'skuPropertyValues') {
                newProductProperties[index][key] = {...productProperties[index][key]};
                for (const subIndex in productProperties[index][key]) {
                    newProductProperties[index][key][subIndex] = {};
                    for (const subKey in productProperties[index][key][subIndex]) {
                        if (subKey === 'propertyValueId'
                            || subKey === 'propertyValueDisplayName'
                            || subKey === 'skuPropertyImagePath'
                            || subKey === 'skuPropertyImageSummPath') {
                            newProductProperties[index][key][subIndex][subKey] = productProperties[index][key][subIndex][subKey];
                        }
                    }
                }
            }
        }
    }

    return newProductProperties;
}

function createPropertiesIdsReferences(productProperties) {
    let idsReferences = {};
    for (const index in productProperties) {
        for (const subIndex in productProperties[index]['skuPropertyValues']) {
            const id = productProperties[index]['skuPropertyValues'][subIndex]['propertyValueId'];
            idsReferences[id] = productProperties[index]['skuPropertyValues'][subIndex]['propertyValueDisplayName'];
        }
    }

    return idsReferences;
}

function generateSkus(data, idsReferences) {
    const skus = data?.priceComponent?.skuPriceList;
    let newSkus = [];

    for (const index in skus) {
        const propertiesId = JSON.parse("[" + skus[index].skuPropIds + "]");
        const names = [];
        for (const propertyIndex in propertiesId) {
            const propertyName = idsReferences[propertiesId[propertyIndex]];
            names.push(propertyName);
        }
        let realDiscount = 0;
        if ('skuActivityAmount' in skus[index].skuVal) {
            realDiscount = (1 - (skus[index].skuVal.skuActivityAmount.value / skus[index].skuVal.skuAmount.value)) * 100;
        }

        newSkus[index] = {
            skuId: skus[index]?.skuId,
            idString: skus[index]?.skuIdStr,
            salable: skus[index]?.salable,
            inventory: skus[index]?.skuVal?.inventory,
            availQuantity: skus[index]?.skuVal?.availQuantity,
            isActivity: skus[index]?.skuVal?.isActivity,
            activityAmount: skus[index]?.skuVal?.skuActivityAmount?.value,
            activityAmountCurrency: skus[index]?.skuVal?.skuActivityAmount?.currency,
            originalAmount: skus[index]?.skuVal?.skuAmount?.value,
            originalAmountCurrency: skus[index]?.skuVal?.skuAmount?.currency,
            calPrice: skus[index]?.skuVal?.skuCalPrice,
            properties: {
                ids: propertiesId,
                names: names,
            },
            freight: {
                amount: skus[index]?.freightExt?.d0,
                currency: skus[index]?.freightExt?.d1,
                itemScene: skus[index]?.freightExt?.itemScene,
                skuIdStr: skus[index]?.freightExt?.p0,
                amount2: skus[index]?.freightExt?.p1,
                currency2: skus[index]?.freightExt?.p3,
                amount2Formatted: skus[index]?.freightExt?.p9,
                p2: skus[index]?.freightExt?.p2,
                p4: skus[index]?.freightExt?.p4,
                p5: skus[index]?.freightExt?.p5,
                p6: skus[index]?.freightExt?.p6,
                p7: skus[index]?.freightExt?.p7,
                p8: skus[index]?.freightExt?.p8,
                p10: skus[index]?.freightExt?.p10,
                p11: skus[index]?.freightExt?.p11,
                p12: skus[index]?.freightExt?.p12,
                p13: skus[index]?.freightExt?.p13,
                p14: skus[index]?.freightExt?.p14,
                p15: skus[index]?.freightExt?.p15,
                p16: skus[index]?.freightExt?.p16,
                p17: skus[index]?.freightExt?.p17,
                p18: skus[index]?.freightExt?.p18,
                p19: skus[index]?.freightExt?.p19,
                p20: skus[index]?.freightExt?.p20,
                p21: skus[index]?.freightExt?.p21,
                p22: skus[index]?.freightExt?.p22,
            },
            discounts: {
                originalVsActivity: {
                    percentage: skus[index]?.skuVal?.discount,
                    tips: skus[index]?.skuVal?.discountTips,
                    real: realDiscount,
                },
                bulk: {
                    order: skus[index]?.skuVal?.bulkOrder,
                    description: skus[index]?.skuVal?.skuExtraTips,
                },
                promotionBanner: {
                    activityStatus: skus[index]?.bannerInfo?.promotionBanner?.activityStatus,
                    atmosphereCode: skus[index]?.bannerInfo?.promotionBanner?.atmosphereCode,
                    endTime: skus[index]?.bannerInfo?.promotionBanner?.endTimer?.endTime,
                    showCountdown: skus[index]?.bannerInfo?.promotionBanner?.endTimer?.showCountdown,
                },
            }
        }
    }

    return newSkus;
}

function getDataInformation(parameters) {
    const data = parameters?.data;
    delete data?.priceComponent?.skuJson;
    const newProductProperties = filterProductProperties(data?.skuComponent?.productSKUPropertyList);
    const idsReferences = createPropertiesIdsReferences(newProductProperties);
    const skus = generateSkus(data, idsReferences);
    const openedDetailedTime = dateDifference(data?.sellerComponent?.openTime, data?.userComponent?.currentTime);
    const categoryPaths = data?.productInfoComponent?.categoryPaths.split('/');

    const item = {
        is23: parameters?.is23,
        item: {
            id: data?.productInfoComponent?.id,
            idStr: data?.productInfoComponent?.idStr,
            status: data?.itemStatusComponent?.status,
            categoryId: data?.productInfoComponent?.categoryId,
            categoryPaths: categoryPaths,
            subject: data?.productInfoComponent?.subject,
            source: data?.productInfoComponent?.src,
            oddUnitName: data?.productInfoComponent?.oddUnitName,
            multiUnitName: data?.productInfoComponent?.multiUnitName,
            taobaoSellerName: data?.productInfoComponent?.taobaoSellerName,
            numberPerLot: data?.productInfoComponent?.numberPerLot,
            adminSeq: data?.productInfoComponent?.adminSeq,
            fromTaobao: data?.productInfoComponent?.fromTaobao,
            lot: data?.productInfoComponent?.lot,
            openOfferPriceRule: data?.productInfoComponent?.openOfferPriceRule,
            minPrice: data?.productInfoComponent?.minPrice,
            sold: data?.tradeComponent?.formatTradeCount,
            isTopItem: data?.productTagComponent?.topItem,
            isInvalidBuyNow: data?.productTagComponent?.invalidBuyNow,
            hasDeliveryMigrate: data?.productTagComponent?.switchInfo?.deliveryMigrate,
            isRechargeProduct: data?.productTagComponent?.rechargeProduct,
            hasX3MoneyBack: data?.productTagComponent?.x3MoneyBack,
            idF1Scene: data?.productTagComponent?.f1Scene,
            hasBoutique: data?.productTagComponent?.boutique,
            inBlackList: data?.blacklistComponent?.inBlackList,
            wishedCount: data?.wishListComponent?.itemWishedCount,
            totalQuantity: data?.inventoryComponent?.totalQuantity,
            totalAvailQuantity: data?.inventoryComponent?.totalAvailQuantity,
            currency: {
                rate: data?.currencyComponent?.currencyRate,
                baseCode: data?.currencyComponent?.baseCurrencyCode,
                code: data?.currencyComponent?.currencyCode,
                multi: data?.currencyComponent?.multiCurrency,
                enableTransaction: data?.currencyComponent?.enableTransaction,
            },
            feedback: data?.feedbackComponent,
            images: data?.imageComponent,
            properties: {
                showGroups: data?.productPropComponent?.showPropGroups,
                showGroups2: data?.productTagComponent?.switchInfo?.showPropGroups,
                groups: data?.productPropComponent?.propGroups,
                list: data?.productPropComponent?.props,
            },
            package: {
                widthCentimeters: data?.packageComponent?.width,
                heightCentimeters: data?.packageComponent?.height,
                lengthCentimeters: data?.packageComponent?.length,
                weightKilograms: data?.packageComponent?.weight,
                lot: data?.packageComponent?.lot,
                lotNum: data?.packageComponent?.lotNum,
                type: data?.packageComponent?.packageType,
            },
            delivery: {
                // TODO: Review if this "choice item" is better to move above in the main item properties.
                isChoiceItem: data?.productTagComponent?.choiceProduct,
                hasChoice: data?.buriedLogComponent?.buriedData?.choice,
                hasChoice3: data?.buriedLogComponent?.choice3,
                sideBarType: data?.cartSideBarInfoComponent?.siteType,
                priceCenter: data?.cartSideBarInfoComponent?.priceCenterBuriedData,
                generalFreightCalculate: {
                    bizData: data?.webGeneralFreightCalculateComponent?.originalLayoutResultList?.['0']?.bizData,
                },

            },
            discount: {
                bulk: {
                    hasDiscount: data?.priceComponent?.displayBulkInfo,
                    valueAddedTax: data?.priceComponent?.vatDesc,
                    percentage: data?.priceComponent?.skuBulkDiscount,
                },
                couponInformation: data?.webCouponInfoComponent,
                promotion: {
                    activity: data?.promotionComponent?.activity,
                    regularPriceActivity: data?.promotionComponent?.regularPriceActivity,
                    memberPriceActivity: data?.promotionComponent?.memberPriceActivity,
                    availableGroupShareActivity: data?.promotionComponent?.availableGroupShareActivity,
                    purchaseLimitNumMax: data?.promotionComponent?.purchaseLimitNumMax,
                    fixedFreeShipping: data?.promotionComponent?.fixedFreeShipping,
                    hbaFreeShipping: data?.promotionComponent?.hbaFreeShipping,
                    enableMultiDiscount: data?.promotionComponent?.enableMultiDiscount,
                    fixedDiscountPromotion: data?.promotionComponent?.fixedDiscountPromotion,
                    fixedPromotionLeftDays: data?.promotionComponent?.fixedPromotionLeftDays,
                    fixedPromotionLeftHours: data?.promotionComponent?.fixedPromotionLeftHours,
                    fixedPromotionLeftMinutes: data?.promotionComponent?.fixedPromotionLeftMinutes,
                    fixedPromotionLeftSecs: data?.promotionComponent?.fixedPromotionLeftSecs,
                    discountPromotion: data?.productInfoComponent?.discountPromotion,
                    promotionLeftDays: data?.promotionComponent?.promotionLeftDays,
                    promotionLeftHours: data?.promotionComponent?.promotionLeftHours,
                    promotionLeftMinutes: data?.promotionComponent?.promotionLeftMinutes,
                    promotionLeftSecs: data?.promotionComponent?.promotionLeftSecs,
                    fireDeals: data?.promotionComponent?.fireDeals,
                    superDeals: data?.promotionComponent?.superDeals,
                    coinsEnough: data?.promotionComponent?.coinsEnough,
                    coinPreSale: data?.promotionComponent?.coinPreSale,
                    preSale: data?.promotionComponent?.preSale,
                    comingSoon: data?.promotionComponent?.comingSoon,
                    allProduct: data?.promotionComponent?.allProduct,
                    showStockPrompt: data?.promotionComponent?.showStockPrompt,
                },
            },
            returnPolicyGuarantees: data?.sellerPromiseComponent,
            extraComponent: data?.extraComponent?.expressionExt,
            assuranceComponent: data?.assuranceComponent,
        },
        seller: {
            storeName: data?.sellerComponent?.storeName,
            storeNumber: data?.sellerComponent?.storeNum,
            companyId: data?.sellerComponent?.companyId,
            openedTime: data?.sellerComponent?.openTime,
            openedDetailedTime: openedDetailedTime,
            openedYears: data?.sellerComponent?.openedYear,
            openedDate: data?.sellerComponent?.formatOpenTime,
            country: data?.sellerComponent?.countryCompleteName,
            isTopRated: data?.sellerComponent?.topRatedSeller,
            isLocalSeller: data?.sellerComponent?.localSeller,
            hasStore: data?.sellerComponent?.hasStore,
            isBoutique: data?.sellerComponent?.boutiqueSeller,
            isPlazaElectronic: data?.sellerComponent?.plazaElectronicSeller,
            showPlazaHeader: data?.sellerComponent?.showPlazaHeader,
            hasPayPalAccount: data?.sellerComponent?.payPalAccount,
            adminSeq: data?.sellerComponent?.adminSeq,
            encryptOwnerMemberId: data?.sellerComponent?.encryptOwnerMemberId,
            hasOverseaWarehouse: data?.sellerGuaranteeComponent?.hasOverseaWarehouse,
            wishedCount: data?.wishListComponent?.storeWished,
            feedback: {
                score: data?.storeFeedbackComponent?.sellerScore,
                total: data?.storeFeedbackComponent?.sellerTotalNum,
                level: data?.storeFeedbackComponent?.sellerLevel,
                positiveRate: data?.storeFeedbackComponent?.sellerPositiveRate,
                positive: data?.storeFeedbackComponent?.sellerPositiveNum,
            },
        },
        user: data?.userComponent,
        products: {
            properties: {
                hasSku: data?.skuComponent?.hasSkuProperty,
                list: newProductProperties,
                ids: data?.skuComponent?.skuPropertyJson,
                IdsReferences: idsReferences,
            },
            skus: skus,
        }
    }
    console.debug(item);

    return JSON.stringify(item);
}

function main() {
    const data = transformJsonToJs(window.runParams);

    const containerDataHtmlElementId = "containerDataHtmlElementId";
    removeElementById(containerDataHtmlElementId);
    const containerDataHtmlElement = document.createElement("div");
    containerDataHtmlElement.setAttribute("id", containerDataHtmlElementId);
    document.body.insertAdjacentElement('afterbegin', containerDataHtmlElement);

    const selectedDataHtmlElementId = "selectedDataHtmlElementId";
    const selectedDataHtmlElement = document.createElement("pre");
    selectedDataHtmlElement.setAttribute("id", selectedDataHtmlElementId);
    selectedDataHtmlElement.textContent = getDataInformation(data);
    containerDataHtmlElement.insertAdjacentElement('afterbegin', selectedDataHtmlElement);

    const hrHtmlElement = document.createElement("hr");
    selectedDataHtmlElement.insertAdjacentElement('afterend', hrHtmlElement);

    const allDataHtmlElementId = "allDataHtmlElementId";
    const allDataHtmlElement = document.createElement("pre");
    allDataHtmlElement.setAttribute("id", allDataHtmlElementId);
    allDataHtmlElement.setAttribute("style", "color: #aaa;");
    allDataHtmlElement.textContent = JSON.stringify(data);
    hrHtmlElement.insertAdjacentElement('afterend', allDataHtmlElement);
}

// noinspection JSUnusedGlobalSymbols
function getItemInformation() {
    const url = window.location.href;
    console.debug("URL: " + url);
    console.debug("Is it an item page?", /.*item\/([0-9]+).html/.test(url))
    if (/.*item\/([0-9]+).html/.test(url)) {
        main();
    }
}

export {getItemInformation};
