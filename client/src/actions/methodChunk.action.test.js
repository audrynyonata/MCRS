const methodChunk_action = require("./methodChunk.action")
// @ponicode
describe("methodChunk_action.fetchMethodChunkBegin", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkBegin()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("methodChunk_action.fetchMethodChunkSuccess", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkSuccess("Producer")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkSuccess("Manager")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkSuccess("Developer")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkSuccess("Architect")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkSuccess(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("methodChunk_action.fetchMethodChunkFailure", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkFailure("Message recipient is not the grader, the person being graded, or the controller")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkFailure("unexpected error")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkFailure("<error_message>%s</error_message>")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkFailure("New Error ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkFailure("Could not find a submission object for message from xqueue")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            methodChunk_action.fetchMethodChunkFailure(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("methodChunk_action.addMethodChunk", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.addMethodChunk("POST")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            methodChunk_action.addMethodChunk("DELETE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            methodChunk_action.addMethodChunk(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("methodChunk_action.readMethodChunks", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.readMethodChunks()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("methodChunk_action.deleteMethodChunk", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.deleteMethodChunk(987650)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            methodChunk_action.deleteMethodChunk("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            methodChunk_action.deleteMethodChunk(56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            methodChunk_action.deleteMethodChunk("a1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            methodChunk_action.deleteMethodChunk(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            methodChunk_action.deleteMethodChunk(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("methodChunk_action.updateMethodChunk", () => {
    test("0", () => {
        let callFunction = () => {
            methodChunk_action.updateMethodChunk("POST")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            methodChunk_action.updateMethodChunk("DELETE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            methodChunk_action.updateMethodChunk(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
