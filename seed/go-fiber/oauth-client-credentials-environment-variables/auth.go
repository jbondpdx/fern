// This file was auto-generated by Fern from our API Definition.

package oauthclientcredentialsenvironmentvariables

import (
	json "encoding/json"
	fmt "fmt"
	core "github.com/oauth-client-credentials-environment-variables/fern/core"
)

type GetTokenRequest struct {
	ClientId     string  `json:"client_id" url:"client_id"`
	ClientSecret string  `json:"client_secret" url:"client_secret"`
	Scope        *string `json:"scope,omitempty" url:"scope,omitempty"`
	audience     string
	grantType    string
}

func (g *GetTokenRequest) Audience() string {
	return g.audience
}

func (g *GetTokenRequest) GrantType() string {
	return g.grantType
}

func (g *GetTokenRequest) UnmarshalJSON(data []byte) error {
	type unmarshaler GetTokenRequest
	var body unmarshaler
	if err := json.Unmarshal(data, &body); err != nil {
		return err
	}
	*g = GetTokenRequest(body)
	g.audience = "https://api.example.com"
	g.grantType = "client_credentials"
	return nil
}

func (g *GetTokenRequest) MarshalJSON() ([]byte, error) {
	type embed GetTokenRequest
	var marshaler = struct {
		embed
		Audience  string `json:"audience"`
		GrantType string `json:"grant_type"`
	}{
		embed:     embed(*g),
		Audience:  "https://api.example.com",
		GrantType: "client_credentials",
	}
	return json.Marshal(marshaler)
}

type RefreshTokenRequest struct {
	ClientId     string  `json:"client_id" url:"client_id"`
	ClientSecret string  `json:"client_secret" url:"client_secret"`
	RefreshToken string  `json:"refresh_token" url:"refresh_token"`
	Scope        *string `json:"scope,omitempty" url:"scope,omitempty"`
	audience     string
	grantType    string
}

func (r *RefreshTokenRequest) Audience() string {
	return r.audience
}

func (r *RefreshTokenRequest) GrantType() string {
	return r.grantType
}

func (r *RefreshTokenRequest) UnmarshalJSON(data []byte) error {
	type unmarshaler RefreshTokenRequest
	var body unmarshaler
	if err := json.Unmarshal(data, &body); err != nil {
		return err
	}
	*r = RefreshTokenRequest(body)
	r.audience = "https://api.example.com"
	r.grantType = "refresh_token"
	return nil
}

func (r *RefreshTokenRequest) MarshalJSON() ([]byte, error) {
	type embed RefreshTokenRequest
	var marshaler = struct {
		embed
		Audience  string `json:"audience"`
		GrantType string `json:"grant_type"`
	}{
		embed:     embed(*r),
		Audience:  "https://api.example.com",
		GrantType: "refresh_token",
	}
	return json.Marshal(marshaler)
}

// An OAuth token response.
type TokenResponse struct {
	AccessToken  string  `json:"access_token" url:"access_token"`
	ExpiresIn    int     `json:"expires_in" url:"expires_in"`
	RefreshToken *string `json:"refresh_token,omitempty" url:"refresh_token,omitempty"`
}

func (t *TokenResponse) String() string {
	if value, err := core.StringifyJSON(t); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", t)
}
