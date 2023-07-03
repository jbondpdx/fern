// This file was auto-generated by Fern from our API Definition.

package api

import (
	bytes "bytes"
	context "context"
	json "encoding/json"
	errors "errors"
	core "github.com/fern-api/fern-go/internal/testdata/sdk/packages/fixtures/core"
	user "github.com/fern-api/fern-go/internal/testdata/sdk/packages/fixtures/user"
	io "io"
	http "net/http"
)

type Client interface {
	GetFoo(ctx context.Context) ([]*Foo, error)
	PostFoo(ctx context.Context, request *Foo) (*Foo, error)
	User() user.Client
}

func NewClient(opts ...core.ClientOption) Client {
	options := core.NewClientOptions()
	for _, opt := range opts {
		opt(options)
	}
	return &client{
		baseURL:    options.BaseURL,
		httpClient: options.HTTPClient,
		header:     options.ToHeader(),
		userClient: user.NewClient(opts...),
	}
}

type client struct {
	baseURL    string
	httpClient core.HTTPClient
	header     http.Header
	userClient user.Client
}

func (c *client) GetFoo(ctx context.Context) ([]*Foo, error) {
	baseURL := "https://api.foo.io/v1"
	if c.baseURL != "" {
		baseURL = c.baseURL
	}
	endpointURL := baseURL + "/" + "foo"

	var response []*Foo
	if err := core.DoRequest(
		ctx,
		c.httpClient,
		endpointURL,
		http.MethodGet,
		nil,
		&response,
		c.header,
		nil,
	); err != nil {
		return response, err
	}
	return response, nil
}

func (c *client) PostFoo(ctx context.Context, request *Foo) (*Foo, error) {
	baseURL := "https://api.foo.io/v1"
	if c.baseURL != "" {
		baseURL = c.baseURL
	}
	endpointURL := baseURL + "/" + "foo"

	errorDecoder := func(statusCode int, body io.Reader) error {
		raw, err := io.ReadAll(body)
		if err != nil {
			return err
		}
		apiError := core.NewAPIError(statusCode, errors.New(string(raw)))
		decoder := json.NewDecoder(bytes.NewReader(raw))
		switch statusCode {
		case 409:
			value := new(ConflictError)
			value.APIError = apiError
			if err := decoder.Decode(value); err != nil {
				return err
			}
			return value
		case 422:
			value := new(UnprocessableEntityError)
			value.APIError = apiError
			if err := decoder.Decode(value); err != nil {
				return err
			}
			return value
		}
		return apiError
	}

	response := new(Foo)
	if err := core.DoRequest(
		ctx,
		c.httpClient,
		endpointURL,
		http.MethodPost,
		request,
		&response,
		c.header,
		errorDecoder,
	); err != nil {
		return response, err
	}
	return response, nil
}

func (c *client) User() user.Client {
	return c.userClient
}
