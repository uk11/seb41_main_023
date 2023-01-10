import axios from "axios";
import styled from "styled-components";
import { useState } from "react";

const AddExpense = ({
  addBudgetModal,
  setAddBudgetModal,
  handleAddExpense,
}) => {
  const [input, setInput] = useState({
    price: 0,
    item: "",
  });

  const handleInputs = (e) => {
    setInput({ [e.name]: e.target.value });
  };
  return (
    <>
      {addBudgetModal ? (
        <ModalContainer onClick={() => setAddBudgetModal(false)}>
          {/*/모달 창 내부에서 닫히지 않도록 이벤트 버블링 방지 */}
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <div className="title_frame">
              <div className="title">Add Expense</div>
              <div
                className="cancle_button"
                onClick={() => setAddBudgetModal(false)}
              >
                ❌
              </div>
            </div>
            <input
              className="content"
              placeholder="비용을 입력해주세요"
              name="price"
              value={input.price}
              onChange={handleInputs}
            />
            <input
              className="content"
              name="item"
              value={input.item}
              onChange={handleInputs}
            />
            <input
              className="content"
              placeholder="Add description"
              // name="item"

              // onChange={handleInputs}
            />
            <div className="submit_frame">
              <button className="btn" onClick={() => handleAddExpense(input)}>
                Add expense
              </button>
              <div
                className="cancle_text"
                onClick={() => setAddBudgetModal(false)}
              >
                Cancle
              </div>
            </div>
          </ModalWrapper>
        </ModalContainer>
      ) : null}
      <AddExpenseBtn
        onClick={() => {
          setAddBudgetModal(!addBudgetModal);
        }}
      >
        Add Expense
      </AddExpenseBtn>
    </>
  );
};

export default AddExpense;

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`;

const ModalWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  z-index: 1050;
  width: 250px;
  display: flex;
  flex-direction: column;

  padding: 20px;
  font-size: 13px;
  line-height: 17px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 4px 0px,
    rgba(0, 0, 0, 0.09) 0px 3px 8px 0px, rgba(0, 0, 0, 0.13) 0px 4px 13px 0px;
  > .title_frame {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 31px;
    width: 245px;

    margin-bottom: 20px;
    font-size: 13px;
    > .title {
      color: #c22e32;
      font-size: 22px;
      line-height: 32px;
      font-weight: 400;
    }
    > .cancle_button {
      width: 13px;
      height: 13px;
      margin-top: 4px;

      cursor: pointer;
      color: #6a737c;
      /* background-color: #3b4045; */
    }
  }
  > .content {
    width: 230px;
    height: 20px;

    margin-bottom: 12px;
    padding: 7px 10px;

    border-radius: 7px;
    border: 1px solid #3b4045;

    font-size: 14px;
    line-height: 17px;
    color: #3b4045;
  }
  > .submit_frame {
    display: flex;
    flex-direction: row;

    margin-top: 10px;
    > .btn {
      background-color: #d0393e;
      color: white;
      line-height: 10px;
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      padding: 0 10px;

      &:hover {
        background-color: #c22e32;
        cursor: pointer;
      }
      border: none;
      border-radius: 5px;
    }
    > .cancle_text {
      width: 50px;
      height: 10px;
      padding: 15px 10px;
      margin: 0 10px;

      font-size: 13px;
      line-height: 15px;
      text-align: center;
      color: #6a737c;

      background-color: none;
      cursor: pointer;
      &:hover {
        border-radius: 5px;

        color: #525960;
        background-color: #f8f9f9;
      }
    }
  }
`;

const AddExpenseBtn = styled.div`
  cursor: pointer;
`;
