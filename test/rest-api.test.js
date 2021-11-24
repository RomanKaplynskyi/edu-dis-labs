const server = require("../src/server")
const axios = require("axios")

const endpoint = "http://localhost:8080/presidents"

afterAll( () => server.close())


describe("read entities", () => {

    test("read complete collection without options", () => axios.get(endpoint)
        .then( resp => expect(resp.data.length).toBe(3) )
    )

    test("read one entity by id from params", () => axios.get(`${endpoint}/1`)
        .then( resp => expect(resp.data.name).toBe("Barrac Obama"))
    )

    test("read one entity by id from query", () => axios.get(`${endpoint}?id=1`)
        .then( resp => expect(resp.data.name).toBe("Barrac Obama"))
    )

    test("read empty by unresolved id", () => axios.get(`${endpoint}?id=5`)
        .then( resp => expect(resp.data.length).toBe(3))
    )

})

describe("test CRUD", () => {
    let entityId
    test("create, update, delete workflow", () => axios.post(endpoint,{
            name:"George Washington"
        })
            .then( resp => {
                entityId = resp.data.id
                expect(resp.data.name).toBe("George Washington")
                return axios.get(endpoint)
            })
            .then( resp => {
                expect(resp.data.length).toBe(4)
                return axios.put(`${endpoint}?id=${entityId}`, {
                    name:"George Washington",
                    photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/240px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
                })
            })
            .then( resp => {
                expect(resp.data.id).toBe(entityId)
                return axios.delete(`${endpoint}?id=${entityId}`)
            })
            .then( resp => {
                expect(resp.data[0].id).toBe(entityId)
                return axios.get(endpoint)
            })
            .then( resp => expect(resp.data.length).toBe(3))
    )
})