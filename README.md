# rotonote
이런저런 프레임워크 및 라이브러리 조합 테스트


# install
git clone을 먼저 받는다.
bower가 설치되어있지 않은 경우 먼저 설치한다.
```
npm install bower -g
```

bower 설치 후, npm module들과 bower component들을 설치한다.
```
npm install
bower install
```

# setup
mongodb 설정파일을 추가해야한다.
```
mkdir config
cd config
nano mongo.conf.json
```

파일내용은 아래처럼 한다.
```javascript
{
    "repository" : "mongodb://주소"
}
```

# run
기본 포트는 3000으로 실행된다.
```
node app.js
```