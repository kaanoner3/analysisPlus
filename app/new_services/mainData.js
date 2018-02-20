import InstagramPrivateAPI from 'instagram-private-api'

class instaApi {
   constructor(username, password, forceLogin = false) {
      //
      // Kütüphane tanımlama
      this.username = username
      this.password = password
      this.Client = InstagramPrivateAPI.V1
      this.device = new this.Client.Device(username)
      this.storage = new this.Client.CookieFileStorage(  "./cookies/" + username + ".json")
      this.session = new this.Client.Session(this.device, this.storage)
      //Force login işlemi eğer catch kısımıa giriyosa true gönderilecek. Ayrıca ilk giriş için cookie klasörü kontrol edilecek eğer dosya yoksa force login yine true olacak.
      if (forceLogin) {
         //this.Client.Session.create(this.device, this.storage, username, password);
      }
   }

   /*
        Giriş yapmış kullanıcıya ait profil bilgilerini döner
    */
   async getUserSelfDetail() {
      return await this.session.getAccount()
   }

   /*
        Kullanıcı adı (string) veya kullanıcı id'si (number) parametre olarak gönderilir,
        gönderilen parametreye ait profil bilgilerini döner     
    */
   async getUserDetail(userIdOrName) {
      return typeof userIdOrName === "string"
         ? this.Client.Account.searchForUser(this.session, userIdOrName)
         : this.Client.Account.getById(this.session, userIdOrName)
   }

   /*
        Kullanıcı id'si (number) parametre olarak gönderilir,
        gönderilen parametreye ait takipçi veya takip bilgilerini döner 
        -
        * maxLoop (number) parametresi opsiyoneldir, döngünün kaç kez çalışacağını belirler. Gönderilmezse döngü önceden belilenen sayı kadar çalışır.
        * feedType (string) parametresi opsiyoneldir, takipçi veya takip edilen kişi isteği belirtilir
    */
   async getUserFeeds(userId, feedType = "", maxLoop = 10) {
      //
      // İstek değişkeni
      let feed = null
      let index = 0
      let result = { items: [] }

      // API isteği ( kullanıcı id'si ile )
      switch (feedType) {
         case "followers":
            feed = new this.Client.Feed.AccountFollowers(this.session, userId, 100)
            break
         case "following":
            feed = new this.Client.Feed.AccountFollowing(this.session, userId, 100)
            break
      }

      if (feedType === "") {
         return null
      } else {
         do {
            // Bir sonraki sayfa için işaretçi atanıyor
            feed.setCursor(feed.getCursor())

            // İstek tamamlanıyor
            await feed.all()

            // Veri işleniyor
            await feed.allResults.map(item => {
               result = {
                  ...result,
                  cursor: feed.getCursor(),
                  items: [...result.items, item._params]
               }
            })

            index++
         } while (feed.moreAvailable && index < maxLoop)

         return result
      }
   }

   getUserFollowers(userId, maxLoop = 10) {
      return this.getUserFeeds(userId, "followers", maxLoop)
   }

   getUserFollowing(userId, maxLoop = 10) {
      return this.getUserFeeds(userId, "following", maxLoop)
   }

   /*
        Kullanıcı id'si (number) parametre olarak gönderilir,
        gönderilen parametreye ait medya bilgilerini döner 
        -
        * cursor (string) parametresi opsiyoneldir, bir sonraki sayfaya ait verilerin dönemsini sağlar
    */
   async getUserMedia(userId, cursor = "") {
      //
      // İstek değişkeni
      let feed = null
      let result = { items: [] }

      // API isteği ( kullanıcı id'si ile )
      feed = new this.Client.Feed.UserMedia(this.session, userId, 10)

      // Bir sonraki sayfa için işaretçi atanıyor
      if (cursor === "") {
         feed.setCursor(feed.getCursor())
      } else {
         feed.setCursor(cursor)
      }

      // İstek tamamlanıyor
      await feed.all()

      // Veri işleniyor
      await feed.allResults.map(item => {
         result = {
            ...result,
            cursor: feed.getCursor(),
            items: [...result.items, item._params]
         }
      })

      return result
   }
}

export default instaApi
