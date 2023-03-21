import { ChangeEvent } from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

export default function AuthModalInputs({
  inputs,
  handleInputChange,
  isSignIn,
}: Props) {
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            id="firstName"
            autoComplete="given-name"
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={inputs.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
          <input
            id="lastName"
            autoComplete="family-name"
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastName}
            onChange={handleInputChange}
            name={"lastName"}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          id="email"
          autoComplete="email"
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInputChange}
          name="email"
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            id="phone"
            autoComplete="tel"
            type="phone"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handleInputChange}
            name="phone"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            onChange={handleInputChange}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputChange}
          name="password"
        />
      </div>
    </div>
  );
}
