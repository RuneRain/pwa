//const CACHE_NAME = 'pwa-offline-v1'; //캐싱스토리지에 저장될 파일명
//const fileToCache = ['./index.html','css/style.css']
// '/' index.html 문서

/*❗❗application
> service workers
  > unregister : 잠깐 끊어준다.
  > Update on reload : 수정된 부분을 다시 불러와줌
  > Source ~.js 옆에 ! 되어있으면 에러난 것. 눌러서 해당부분 수정해주기.

>Cache Storage
  > 그 하단에 있는 부분은 오프라인에서도 사용 가능함.

*/
//서비스워커 설치
self.addEventListener("install",function(e){
  //👆서비스워커에서 self는 window와 같은 의미(페이지에서 윈도우를 감지)

  //웹자원 캐싱 chrome://serviceworker-internals/
  //waitUtil() : ()안의 로직이 끝나기 전까진 이벤트가 안 끝남.
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=>{
        return cache.addAll(fileToCache) //파일을 다 집어넣어줌
      })
      .catch((error)=>{
        return console.log('에러 발생',error)
      })
  )
})
  //서비스 워커 설치 후, 네트워크 요청이 있을 때는 캐쉬로 돌려줌
    self.addEventListener('fetch',function(e){
      //respondWidth() - fetch이벤트에 대한 응답결과를 주는 메소드
      console.log('e.request',e.request)
      e.respondWidth(caches.match(e.request)
      //caches.match(e.request) - 같은 리퀘스트가 있는지 찾아봄
      /* return response 같은게 있으면 response를 그대로 리턴
        (캐시에서 가져옴) or 
        없으면 네트워크(서버)에서 가져옴 */
      .then((response)=>{//성공
        return response || fetch(e.request)
      })
      .catch((error)=>{//실패
        return console.log('에러 발생',error)
      })    
    );
  })

  const CACHE_NAME = 'pwa-offline-v1'; //캐싱스토리지에 저장될 파일명
  const fileToCache = ['./index.html','./chatlist.html',
  'css/style.css']


  //서비스워커가 달라졌을 때 업데이트
  //서비스워커 활성화 및 업데이트
    self.addEventListener('active',function(e){
      const newCacheList = ['pwa-offline-v2'];

      e.waitUntil(
      caches.keys()
      //caches.keys() 캐시스토리지 아이템들의 name(목록 확인)-array
      .then ((catchList)=>{
        return Promise.all(
        catchList.map((cacheName)=>{
          if(newCacheList.indexOf(cacheName) === -1){
            return caches.delete(cacheName);
          }
          //if(newCacheList.indexOf(cacheName) === -1
          //같은 게 없음 0이면 같은 거 있음
      }))
    }
    )
      .catch((error)=>{//실패
        return console.log('에러 발생',error)
      })
      )
    })