import React, { useEffect, useState } from 'react';
import GameRow from './GameRow';
import { validateWord } from './Logic';

const GridComponent = (props) => {
	const {
		input = [],
		callback,
		gameOver
	} = props;

	const [pointer, setPointer] = useState({
		"col": 0,
		"row": 0
	});
	const [rowObjArr, setRowObjArr] = useState([]);
	const [activeRow, setActiveRow] = useState(0);
	const [message, setMessage] = useState("");
	const msgArr = ["Exceptional", "Outstanding", "Amazing", "Great", "Very Good", "That was close", "Better luck next time"]
    const [typeWord, setTypeWord] = useState("");
    const [lost, setLost] = useState(false);

const handleKeyboard = (e) => {
    let rowObj = rowObjArr[activeRow];
    let arr = []

    if (e.key === "Enter") {
        e.preventDefault();
        onEnter(rowObj, arr);
    } 
    else if (e.key === "Backspace") {
        onDelete(rowObj, arr);
    }
    else {
        let key = e.key.toUpperCase();
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
            if (pointer.col < 5) {
                let rowWord = ""
                if (message === "Word not in List") {
                    setMessage("");
                }
                
                if (rowObj === undefined) {
                    let obj = {
                        "rowWord": "",
                        "letterStateArr": ["default", "default", "default", "default", "default"]
                    }
                    arr = rowObjArr;
                    rowWord = key;
                    obj.rowWord = rowWord;
                    arr.push(obj)
                    setRowObjArr(arr);
                }
                else {
                    arr = rowObjArr;
                    rowObj.rowWord = rowObj.rowWord + key;
                    arr[activeRow] = rowObj;
                    setRowObjArr(arr);
                }
            }
        
            let pObj = {
                "col": pointer.col <= 4 ? pointer.col + 1 : pointer.col,
                "row": pointer.row
            }
            setPointer(pObj);
        }
    }
}
    const onKeys = (lastIndex, rowObj, arr) => {
        if (pointer.col < 5) {
            let rowWord = ""
            if (message === "Word not in List") {
                setMessage("");
            }

            if (rowObj === undefined) {
                let obj = {
                    "rowWord": "",
                    "letterStateArr": ["default", "default", "default", "default", "default"]
                }
                arr = rowObjArr;
                rowWord = input[lastIndex];
                obj.rowWord = rowWord;
                arr.push(obj)
                setRowObjArr(arr);
            }
            else {
                arr = rowObjArr;
                rowObj.rowWord = rowObj.rowWord + input[lastIndex];
                arr[activeRow] = rowObj;
                setRowObjArr(arr);
            }
        }

        let pObj = {
            "col": pointer.col <= 4 ? pointer.col + 1 : pointer.col,
            "row": pointer.row
        }
        setPointer(pObj);
    }

    const onDelete = (rowObj, arr) => {
        arr = rowObjArr;
        if (pointer.row < 5 && pointer.col !== 0) {
            if (rowObj.rowWord !== undefined) {
                rowObj.rowWord = rowObj.rowWord.slice(0, -1);
                arr[activeRow] = rowObj;
                setRowObjArr(rowObjArr);
                let pObj = {
                    "col": pointer.col > 0 ? pointer.col - 1 : pointer.col,
                    "row": pointer.row
                }
                setPointer(pObj)
            }
        }
        setMessage("");
    }

    const onEnter = (rowObj, arr) => {
        let respObj = validateWord(rowObj.rowWord);
        if (respObj.type === "correct") {
            callback();
        } else if (respObj.type === "unacceptable") {
            setMessage("Word not in List");
        }
        arr = rowObjArr;
        rowObj.letterStateArr = respObj.letterStateArr;
        arr[activeRow] = rowObj;
        setRowObjArr(arr);

        if (respObj.isValid) {
            let pObj = {
                "col": 0,
                "row": pointer.row + 1
            }
            setPointer(pObj);
            setActiveRow(activeRow => activeRow + 1);
            setTypeWord(respObj.type);
        }
    }

    useEffect(() => {
		let lastIndex = input.length - 1;
		let rowObj = rowObjArr[activeRow];
		let arr = []

		if (input.length > 0 && !gameOver) {
			if (input[lastIndex] !== "goback" && input[lastIndex] !== "submit") {
                onKeys(lastIndex, rowObj, arr);
			}
			else if (input[lastIndex] === "goback") {
                onDelete(rowObj, arr);
			}
			else if (input[lastIndex] === "submit") {
				onEnter(rowObj, arr);
			}
		}
	}, [input])

    const displayGrid = () => {
        let html = [];
        for (let i = 0; i < 6; i++) {
            html.push(
                <GameRow key={i} index={i} rowObjArr={rowObjArr} activeRow={activeRow} />
            )
        }
        return html;
    }

	const showMessage = () => {
		return (
			<div className="message-block">
				{message}
			</div>
		)
	}

    useEffect(() => {
        if (gameOver) return;
        document.addEventListener("keydown", handleKeyboard)
        return () => document.removeEventListener("keydown", handleKeyboard)
    },[handleKeyboard]);

    useEffect(() => {
        if (activeRow === 6 && typeWord === "incorrect") {
            setLost(true);
            callback();
        }
        else if (activeRow === 6) {
            callback();
        }
    }, [activeRow]);

useEffect(() => {
    if (gameOver === true && lost  === true){
        setMessage("Better luck next time");
    }
    else if (gameOver) {
        setMessage(msgArr[activeRow-1]);
    }
}, [gameOver]);

	return (
		<div className='gridbody-wrapper'>
			{
				message.length > 0 ?
					showMessage() : ""
			}
			<div className='board'>
				{
					displayGrid()
				}
			</div>
		</div>
	)
}

export default GridComponent