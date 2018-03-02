import { NativeModules } from "react-native"
const { InAppUtils } = NativeModules
//import loading from './loading';
//import { validatePurchase } from 'services';
//import { Crashlytics, Answers } from 'react-native-fabric';
//import analytics from './analytics';
import store from "store"
//import { doGetProfileInfo }from 'ducks/profile';
export async function createPurchaseInstance() {
    console.log('girrrdiiii')
    console.log(InAppUtils)
   var products = ["com.iznet.analysis.subscription.1month", "com.iznet.analysis.subscription.3month"]

   InAppUtils.loadProducts(products, (error, products) => {
      console.log("products:", products)
   })
}
export async function handleUnfinishedTransactions(navigator) {
   /*
  return new Promise((resolve, reject) => {

    InAppUtils.getPendingPurchases(async (transactions) => {
      console.log('TRANSACTIONS');
      console.log(transactions);

      const serviceCalls = [];

      if (transactions.length > 0) {
        loading.show();

        for (let i = 0; i < transactions.length; i++) {
          const transaction = transactions[i];

          switch (transaction.state) {
            case 'purchased':
              // InAppUtils.finishPurchase(transaction.identifier, (error) => { });
              Crashlytics.recordError('Unfinished transaction detected!');

              serviceCalls.push(validatePurchase(
                transaction.productIdentifier,
                transaction.receipt,
                'unfinished',
              )
                .then((response) => {
                  console.log(response);
                  InAppUtils.finishPurchase(transaction.identifier, error => {
                    if (!error) {
                      console.log('Transaction finished without errors');
                      Crashlytics.recordError(
                        'Unfinished transaction validated!',
                      );
                    } else {
                      Crashlytics.recordError(
                        'Unfinished transaction validation failed.',
                      );
                    }
                  });
                })
                .catch(error => {
                  if (error.response) {
                    if (error.response.status == 500) {
                      InAppUtils.finishPurchase(transaction.identifier, error => {
                        if (!error) {
                          console.log('Transaction finished without errors');
                          Crashlytics.recordError(
                            'Unfinished transaction validated! (500)',
                          );
                        } else {
                          Crashlytics.recordError(
                            'Unfinished transaction validation failed. (500)',
                          );
                        }
                      });
                    }
                  }
                }),
              );
              break;

            default:
              break;
          }
        }

        await Promise.all(serviceCalls);
        // store.dispatch(doGetProfileInfo());
        navigator.popToRoot({ animated: true, animationType: 'fade' });
        loading.hide();
        setTimeout(() => { store.dispatch(doGetProfileInfo()); }, 200);
      }
      resolve();
    });
  });
  */
}

export function buyItem(item, type, navigator) {
   /*
  Crashlytics.recordError(`Buy ${type} action triggered.`);
  loading.show();
  InAppUtils.purchaseProduct(
    item.apple_store_id,
    (error, response) => {
      // console.log(error);
      // console.log(response);
      // NOTE for v3.0: User can cancel the payment which will be available as error object here.
      if (response && response.productIdentifier) {
        // alert('Purchase Successful', `Your Transaction ID is ${response.transactionIdentifier}`);
        // unlock store here.
        Crashlytics.recordError(`Buy ${type} action success.`); // , { json: JSON.stringify(response) }
        Answers.logPurchase(item.price, item.currencyCode, true, item.title, type, item.apple_store_id);
        analytics.trackPurchaseEvent({
          id: 'P_'+item.transactionIdentifier,
          name: item.title,
          category: type,
          price: item.price,
        }, { id: 'T_'+item.transactionIdentifier }, 'Ecommerce', 'Purchase');

        validatePurchase(response.productIdentifier, response.transactionReceipt).then((resp) => {
          // console.log(response);
          Crashlytics.recordError(`Buy ${type} action validated.`);
          InAppUtils.finishPurchase(response.transactionIdentifier, (error) => {
            if (!error) {
              console.log('Transaction finished without errors');
            } else {
              console.log(error);
            }
          });

          // this.props.getProfileInfo();
          navigator.popToRoot({ animated: true, animationType: 'fade' });
          loading.hide();
          setTimeout(() => { store.dispatch(doGetProfileInfo()); }, 200);

          // this.props.navigator.pop();
        })
        .catch((error) => {
          Crashlytics.recordError(`Buy ${type} action validation failed.`); // { json: JSON.stringify(error) }
          console.log('validation failed.');
          console.log(error);

          navigator.popToRoot({ animated: true, animationType: 'fade' });
          loading.hide();
        });
      }

      if (error) {
        console.warn(error);
        Crashlytics.recordError(`Buy ${type} action failed.`); // , { json: JSON.stringify(error) }
        loading.hide();
      }
    },
  );
  */
}
