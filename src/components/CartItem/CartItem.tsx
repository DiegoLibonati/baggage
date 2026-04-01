import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { CartItemProps } from "@/types/props";

import { useCartContext } from "@/hooks/useCartContext";

import "@/components/CartItem/CartItem.css";

const CartItem = ({ id }: CartItemProps) => {
  const { state, dispatch } = useCartContext();

  const item = state.cart.find((cartItem) => cartItem.id === id);

  return (
    <div className="item">
      <div className="item__img-wrapper">
        <img className="item__img" src={item?.img} alt={item?.title}></img>
      </div>

      <div className="item__information">
        <h3 className="item__title">{item?.title}</h3>
        <p className="item__price">${item?.price}</p>
        <button
          type="button"
          className="item__remove"
          aria-label={`Remove ${item?.title} from cart`}
          onClick={() => dispatch({ type: "CLEAR_ITEM", payload: { id: id } })}
        >
          Remove
        </button>
      </div>

      <div className="item__amount">
        <button
          type="button"
          aria-label={`Increase quantity of ${item?.title}`}
          className="item__increase"
          onClick={() => dispatch({ type: "INCREASE_ITEM", payload: { id: id } })}
        >
          <BsChevronUp
            id="cart-up"
            className="item__increase-icon"
            aria-hidden="true"
          ></BsChevronUp>
        </button>
        <p className="item__amount-text" aria-label={`Quantity: ${item?.amount}`}>
          {item?.amount}
        </p>
        <button
          type="button"
          aria-label={`Decrease quantity of ${item?.title}`}
          className="item__decrease"
          onClick={() => dispatch({ type: "DECREASE_ITEM", payload: { id: id } })}
        >
          <BsChevronDown
            id="cart-down"
            className="item__decrease-icon"
            aria-hidden="true"
          ></BsChevronDown>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
