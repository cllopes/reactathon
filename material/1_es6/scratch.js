const logicToGetResult = ()  => 5

function asyncFunc() {
    return new Promise(
        function (resolve, reject) {
            try {
                const result = logicToGetResult()
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
}

const res = asyncFunc().then(result => console.log(result))